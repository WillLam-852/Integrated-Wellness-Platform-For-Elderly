//
//  CameraViewController.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 13/4/2024.
//

import AVFoundation
import MediaPipeTasksVision
import UIKit

/**
 * The view controller is responsible for performing detection on incoming frames from the live camera and presenting the frames with the
 * landmark of the landmarked poses to the user.
 */
class CameraViewController: UIViewController {
  private struct Constants {
    static let edgeOffset: CGFloat = 2.0
  }
  
    // Declare outlets for UI elements
  @IBOutlet weak var previewView: UIView!
  @IBOutlet weak var cameraUnavailableLabel: UILabel!
  @IBOutlet weak var resumeButton: UIButton!
  @IBOutlet weak var overlayView: OverlayView!
  @IBOutlet weak var doneButton: UIBarButtonItem!
  @IBOutlet weak var scoreProgressView: UIProgressView!
  @IBOutlet weak var countLabel: UILabel!
  
    // Declare properties for session and observation tracking
  private var isSessionRunning = false
  private var isObserving = false
  private let backgroundQueue = DispatchQueue(label: K.DispatchQueueLabel.backgroundQueue)
  
  private var exercises: [AbstractExercise] = [
    Exercise1(Plan(id: 1, target: 10, disabilityFactor: 1.0)),
    Exercise2(Plan(id: 1, target: 10, disabilityFactor: 1.0)),
    Exercise3(Plan(id: 1, target: 10, disabilityFactor: 1.0))
  ]
  private var currentExerciseIndex: Int = 0
  private var currentExercise: AbstractExercise? {
    get {
      if self.currentExerciseIndex < self.exercises.count {
        return self.exercises[self.currentExerciseIndex]
      }
      return nil
    }
  }
  
  private var isExerciseFirstStart: Bool = true
  
  
    // MARK: - Button Actions
  
  @IBAction func doneButtonPressed(_ sender: UIBarButtonItem) {
    self.dismiss(animated: true)
  }

  
    // MARK: Controllers that manage functionality
    // Handles all the camera related functionality
  private lazy var cameraFeedModule = CameraFeedModule(previewView: previewView)
  
    // Declare a queue for accessing the poseLandmarkerService property
  private let poseLandmarkerServiceQueue = DispatchQueue(
    label: K.DispatchQueueLabel.poseLandmarkerServiceQueue,
    attributes: .concurrent)
  
    // The poseLandmarkerService property for performing pose landmark detection
    // Queuing reads and writes to poseLandmarkerService using the Apple recommended way
    // as they can be read and written from multiple threads and can result in race conditions.
  private var _poseLandmarkerService: PoseLandmarkerService?
  private var poseLandmarkerService: PoseLandmarkerService? {
    get {
      poseLandmarkerServiceQueue.sync {
        return self._poseLandmarkerService
      }
    }
    set {
      poseLandmarkerServiceQueue.async(flags: .barrier) {
        self._poseLandmarkerService = newValue
      }
    }
  }
  
  
    // MARK: - View Handling Methods

#if !targetEnvironment(simulator)
  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    initializePoseLandmarkerServiceOnSessionResumption()
      // Start the camera session and handle the configuration result
    cameraFeedModule.startLiveCameraSession {[weak self] cameraConfiguration in
      DispatchQueue.main.async {
        switch cameraConfiguration {
          case .failed:
            self?.presentVideoConfigurationErrorAlert()
          case .permissionDenied:
            self?.presentCameraPermissionsDeniedAlert()
          default:
            break
        }
      }
    }
  }
  
  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
      // Stop the camera session
    cameraFeedModule.stopSession()
    clearPoseLandmarkerServiceOnSessionInterruption()
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    cameraFeedModule.delegate = self
      // Do any additional setup after loading the view.
    self.setUILayout()
  }
  
  override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
      // Update the video preview layer when the view appears
    cameraFeedModule.updateVideoPreviewLayer(toFrame: previewView.bounds)
  }
  
  override func viewWillLayoutSubviews() {
    super.viewWillLayoutSubviews()
      // Update the video preview layer when the view layout changes
    cameraFeedModule.updateVideoPreviewLayer(toFrame: previewView.bounds)
  }
#endif
  
    // Resume camera session when the resume button is clicked
  @IBAction func onClickResume(_ sender: Any) {
    cameraFeedModule.resumeInterruptedSession {[weak self] isSessionRunning in
      if isSessionRunning {
        self?.resumeButton.isHidden = true
        self?.cameraUnavailableLabel.isHidden = true
        self?.initializePoseLandmarkerServiceOnSessionResumption()
      }
    }
  }
  
    // Present an alert when camera permissions are denied
  private func presentCameraPermissionsDeniedAlert() {
    let alertController = UIAlertController(
      title: "Camera Permissions Denied",
      message:
        "Camera permissions have been denied for this app. You can change this by going to Settings",
      preferredStyle: .alert)
    
    let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: nil)
    let settingsAction = UIAlertAction(title: "Settings", style: .default) { (action) in
      UIApplication.shared.open(
        URL(string: UIApplication.openSettingsURLString)!, options: [:], completionHandler: nil)
    }
    alertController.addAction(cancelAction)
    alertController.addAction(settingsAction)
    
    present(alertController, animated: true, completion: nil)
  }
  
    // Present an alert when video configuration fails
  private func presentVideoConfigurationErrorAlert() {
    let alert = UIAlertController(
      title: "Camera Configuration Failed",
      message: "There was an error while configuring camera.",
      preferredStyle: .alert)
    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
    
    self.present(alert, animated: true)
  }
  
  
    // MARK: - Pose Landmark Service
  
  private func initializePoseLandmarkerServiceOnSessionResumption() {
    clearAndInitializePoseLandmarkerService()
    startObserveConfigChanges()
  }

  
  @objc private func clearAndInitializePoseLandmarkerService() {
      // Clear the existing poseLandmarkerService
    poseLandmarkerService = nil
    
      // Initialize a new poseLandmarkerService with the specified configuration
    poseLandmarkerService = PoseLandmarkerService
      .liveStreamPoseLandmarkerService(
        modelPath: InferenceConfigurationManager.sharedInstance.model.modelPath,
        numPoses: InferenceConfigurationManager.sharedInstance.numPoses,
        minPoseDetectionConfidence: InferenceConfigurationManager.sharedInstance.minPoseDetectionConfidence,
        minPosePresenceConfidence: InferenceConfigurationManager.sharedInstance.minPosePresenceConfidence,
        minTrackingConfidence: InferenceConfigurationManager.sharedInstance.minTrackingConfidence,
        liveStreamDelegate: self,
        delegate: InferenceConfigurationManager.sharedInstance.delegate)
  }
  
  
  private func clearPoseLandmarkerServiceOnSessionInterruption() {
    stopObserveConfigChanges()
    
      // Clear the poseLandmarkerService
    poseLandmarkerService = nil
  }
  
  
  private func startObserveConfigChanges() {
      // Add observer for configuration changes
    NotificationCenter.default
      .addObserver(self,
                   selector: #selector(clearAndInitializePoseLandmarkerService),
                   name: InferenceConfigurationManager.notificationName,
                   object: nil)
    isObserving = true
  }
  
  private func stopObserveConfigChanges() {
    if isObserving {
        // Remove observer for configuration changes
      NotificationCenter.default
        .removeObserver(self,
                        name: InferenceConfigurationManager.notificationName,
                        object: nil)
    }
    isObserving = false
  }
  
  private func setUILayout() {
    self.title = self.currentExercise?.name
    self.scoreProgressView.transform = CGAffineTransform(scaleX: 1.0, y: 4.0)
  }
  
  private func changeExercise() {
    self.currentExerciseIndex += 1
    self.isExerciseFirstStart = true
    DispatchQueue.main.async { [weak self] in
      if let currentExercise = self?.currentExercise {
        self?.title = currentExercise.name
        self?.countLabel.text = "\(currentExercise.count) / \(currentExercise.plan.target)"
      } else {
        self?.dismiss(animated: true)
      }
    }
  }
  
}


// MARK: - CameraFeedModuleDelegate

extension CameraViewController: CameraFeedModuleDelegate {
  
  /** This method is called when a sample buffer is output from the camera feed.
   *  It retrieves the current timestamp in milliseconds and asynchronously passes the sample buffer, orientation, and timestamp to the poseLandmarkerService for detection
   */
  func didOutput(sampleBuffer: CMSampleBuffer, orientation: UIImage.Orientation) {
    let currentTimeMs = Date().timeIntervalSince1970 * 1000
      // Pass the pixel buffer to mediapipe
    backgroundQueue.async { [weak self] in
      self?.poseLandmarkerService?.detectAsync(
        sampleBuffer: sampleBuffer,
        orientation: orientation,
        timeStamps: Int(currentTimeMs))
    }
  }
  
    // MARK: - Session Handling Alerts
  
  /** This method is called when the camera session is interrupted.
      It updates the UI based on whether the session can be manually resumed or not.
      If it can be resumed manually, it shows the resume button; otherwise, it shows the camera unavailable label.
      It also calls the clearPoseLandmarkerServiceOnSessionInterruption() method to clear the poseLandmarkerService.
   */
  func sessionWasInterrupted(canResumeManually resumeManually: Bool) {
      // Updates the UI when session is interupted.
    if resumeManually {
      resumeButton.isHidden = false
    } else {
      cameraUnavailableLabel.isHidden = false
    }
    clearPoseLandmarkerServiceOnSessionInterruption()
  }
  
  /** This method is called when the session interruption has ended.
      It updates the UI by hiding the cameraUnavailableLabel and resumeButton.
      It then calls the initializePoseLandmarkerServiceOnSessionResumption() method to initialize the poseLandmarkerService.
   */
  func sessionInterruptionEnded() {
      // Updates UI once session interruption has ended.
    cameraUnavailableLabel.isHidden = true
    resumeButton.isHidden = true
    initializePoseLandmarkerServiceOnSessionResumption()
  }
  
  /** This method is called when a runtime error is encountered during the camera session.
      It updates the UI by showing the resume button and calls the clearPoseLandmarkerServiceOnSessionInterruption() method to clear the poseLandmarkerService.
   */
  func didEncounterSessionRuntimeError() {
      // Handles session run time error by updating the UI and providing a button if session can be
      // manually resumed.
    resumeButton.isHidden = false
    clearPoseLandmarkerServiceOnSessionInterruption()
  }
}

  // MARK: PoseLandmarkerServiceLiveStreamDelegate
extension CameraViewController: PoseLandmarkerServiceLiveStreamDelegate {
  
  /** This method is called by the poseLandmarkerService when the pose detection is finished.
      It updates the UI on the main queue. It extracts the poseLandmarkerResult from the result parameter and uses it to generate poseOverlays using the OverlayView.poseOverlays method.
      Finally, it calls the overlayView.draw method to display the pose overlays on the overlayView.
   */
  func poseLandmarkerService(
    _ poseLandmarkerService: PoseLandmarkerService,
    didFinishDetection result: ResultBundle?,
    error: Error?) {
      DispatchQueue.main.async { [weak self] in
        guard let weakSelf = self else { return }
        guard let poseLandmarkerResult = result?.poseLandmarkerResults.first as? PoseLandmarkerResult else { return }
        let imageSize = weakSelf.cameraFeedModule.videoResolution
        
        if !poseLandmarkerResult.landmarks.isEmpty {
          let pose = Pose(poseLandmarkerResult.landmarks[0])
          do {
            try weakSelf.checkCount(pose)
          } catch {
            print("checkCount error: ", error.localizedDescription)
          }
        }
        
        let poseOverlays = OverlayView.poseOverlays(
          fromMultiplePoseLandmarks: poseLandmarkerResult.landmarks,
          inferredOnImageOfSize: imageSize,
          ovelayViewSize: weakSelf.overlayView.bounds.size,
          imageContentMode: weakSelf.overlayView.imageContentMode,
          andOrientation: UIImage.Orientation.from(
            deviceOrientation: UIDevice.current.orientation))
        weakSelf.overlayView.draw(poseOverlays: poseOverlays,
                                  inBoundsOfContentImageOfSize: imageSize,
                                  imageContentMode: weakSelf.cameraFeedModule.videoGravity.contentMode)
      }
    }
  
  
  private func checkCount(_ pose: Pose) throws {
    let calculationExtraInformation = CalculationExtraInformation(timeStamp: Date(), isFirstStart: self.isExerciseFirstStart)
    if let currentExercise = self.currentExercise {
      let target = currentExercise.plan.target
      
      let shownFrameInformation = try currentExercise.check(pose, calculationExtraInformation) { [weak self] in
        self?.isExerciseFirstStart = false
      }
      
//      print(shownFrameInformation)
      
      if let shownFrameInformation = shownFrameInformation {
        self.handleScore(shownFrameInformation)
        self.handleCount(shownFrameInformation, target)
      }
    }
  }
  
  
  private func handleScore(_ shownFrameInformation: ShownFrameInformation) {
    DispatchQueue.main.async { [weak self] in
      self?.scoreProgressView.progress = Float(shownFrameInformation.score) / 100.0
    }
  }
  
  
  private func handleCount(_ shownFrameInformation: ShownFrameInformation, _ target: Int) {
    let count = shownFrameInformation.count
    DispatchQueue.main.async { [weak self] in
      self?.countLabel.text = "\(count) / \(target)"
    }
    if count >= target {
      self.changeExercise()
    }
  }

}

  // MARK: - AVLayerVideoGravity Extension
extension AVLayerVideoGravity {
  
  /** This extension provides a computed property contentMode for AVLayerVideoGravity.
      It maps the different AVLayerVideoGravity options to UIView.ContentMode options for easier usage in the UI.
   */
  var contentMode: UIView.ContentMode {
    switch self {
      case .resizeAspectFill:
        return .scaleAspectFill
      case .resizeAspect:
        return .scaleAspectFit
      case .resize:
        return .scaleToFill
      default:
        return .scaleAspectFill
    }
  }
}
