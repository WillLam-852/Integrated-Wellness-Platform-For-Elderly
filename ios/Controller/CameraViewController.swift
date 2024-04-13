//
//  CameraViewController.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 13/4/2024.
//

import AVFoundation
import UIKit

final class CameraViewController: UIViewController {
  
  // MARK: Storyboards Connections
  @IBOutlet weak var overlayView: UIImageView!
  
  // MARK: - Camera & Image
  /// Handle the camera pipeline.
  private var cameraFeedModule: CameraFeedModule? = CameraFeedModule()
  
  private var windowOrientation: UIInterfaceOrientation {
    return self.view.window?.windowScene?.interfaceOrientation ?? .unknown
  }
  
  
  // MARK: - Button Actions
  
  @IBAction func returnButtonPressed(_ sender: UIBarButtonItem) {
    DispatchQueue.main.async {
      self.dismiss(animated: true)
    }
  }
  
  
  // MARK: - View Handling Methods
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    self.cameraFeedModule!.authorizeCamera()
    self.cameraFeedModule!.configureSession(windowOrientation: self.windowOrientation, sampleBufferDelegate: self)
    
    self.setupUILayout()
    
    // Disable idle timer so the device will not sleep automatically
    UIApplication.shared.isIdleTimerDisabled = true
  }
  
  
  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    
    let setupResult = self.cameraFeedModule!.getVideoSetupResult()
    switch setupResult {
    case .success:
      // Only setup observers and start the session if setup succeeded.
      self.cameraFeedModule!.startRunning {
      }
      
    case .notAuthorized:
      DispatchQueue.main.async {
        let alertController = UIAlertController(
          title: NSLocalizedString(K.Localization.permissionRequest, comment: "Permission Required"),
          message: NSLocalizedString(K.Localization.enablePermission, comment: "Please enable Camera Permission to use this function."),
          preferredStyle: .alert
        )
        alertController.addAction(UIAlertAction(
          title: NSLocalizedString(K.Localization.OK, comment: "OK"),
          style: .cancel,
          handler: nil
        ))
        alertController.addAction(UIAlertAction(
          title: NSLocalizedString(K.Localization.settings, comment: "Settings"),
          style: .default,
          handler: { _ in
            UIApplication.shared.open(URL(string: UIApplication.openSettingsURLString)!,
                                      options: [:],
                                      completionHandler: nil)
          }
        ))
        self.present(alertController, animated: true, completion: nil)
      }
      
    case .configurationFailed:
      DispatchQueue.main.async {
        let alertController = UIAlertController(
          title: NSLocalizedString(K.Localization.error, comment: "Error"),
          message: NSLocalizedString(K.Localization.unableCaptureMedia, comment: "Unable to capture media"),
          preferredStyle: .alert
        )
        alertController.addAction(UIAlertAction(
          title: NSLocalizedString(K.Localization.OK, comment: "OK"),
          style: .cancel,
          handler: nil
        ))
        self.present(alertController, animated: true, completion: nil)
      }
    }
  }
  
  
  override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    // Initialize the varaibles
  }
  
  
  override func viewWillDisappear(_ animated: Bool) {
    self.cameraFeedModule!.stopRunning()
    super.viewWillDisappear(animated)
  }
  
  
  override func viewDidDisappear(_ animated: Bool) {
    // Enable idle timer so the device will not sleep automatically
    UIApplication.shared.isIdleTimerDisabled = false
    
    // Remove all variables (for reducing memory use)
    self.cameraFeedModule = nil
    super.viewDidDisappear(animated)
  }
  
  
  // MARK: - UI Layout
  
  private func setupUILayout() {
    self.overlayView.isHidden = false
  }
  
}


// MARK: - AVCaptureVideoDataOutputSampleBufferDelegate Methods

extension CameraViewController: AVCaptureVideoDataOutputSampleBufferDelegate {
    
    /// Called whenever an AVCaptureVideoDataOutput instance outputs a new video frame.
    func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
            return
        }
        CVPixelBufferLockBaseAddress(pixelBuffer, CVPixelBufferLockFlags.readOnly)
        // Show the real-time video thread
        DispatchQueue.main.async {
            self.overlayView.image = UIImage(ciImage: CIImage(cvPixelBuffer: pixelBuffer))
            // Send the image to analyse information
//            self.poseAndHandTracker!.send(pixelBuffer, timestamp: CMSampleBufferGetPresentationTimeStamp(sampleBuffer), isPoseTherapy: self.currentTherapyMode == .pose)
        }
        CVPixelBufferUnlockBaseAddress(pixelBuffer, CVPixelBufferLockFlags.readOnly)
    }
    
    
}


// MARK: - PoseAndHandTrackerDelegate

//extension CameraViewController: PoseAndHandTrackerDelegate {
//    
//    func poseAndHandTracker(_ tracker: PoseAndHandTracker!, didOutputPixelBuffer pixelBuffer: CVPixelBuffer!) {
//        // This function returns the image by mediapipe (not used, for testing only)
//    }
//    
//    
//    // MARK: - Pose Therapy Outputs
//    
//    // Use this normalized landmarks list for display
//    func poseAndHandTracker(_ tracker: PoseAndHandTracker!, didOutputPoseLandmarks landmarks: [Landmark]!, timestamp time: CMTime) {
//        self.detectionQueue.async {
//            // Check if the function is already running
//            guard !self.isDidOutputLandmarksFunctionRunning else {
//                // Ignore the request if the function is still running
//                return
//            }
//        }
//        
//        // Set the flag to indicate that the function is running
//        self.isDidOutputLandmarksFunctionRunning = true
//        
//        if self.currentTherapyMode == .pose {
//            if self.therapyStage == .readyToCalibrate || self.therapyStage == .duringTherapy || self.therapyStage == .pause {
//                // Draw pose skeletonr
//                let pose = Pose(landmarks, self.cameraSide == .front)
//                self.displayPose = pose
////                if let poseCheckComplete = self.poseCheckComplete {
////                    poseCheckComplete.createPose(pose)
////                }
//                
//                // Case 2: Person is detected
//                if self.poseCheckComplete != nil {
//                    do {
//                        // End count down clock timer
//                        self.endNoPersonOrHandCountDownClock()
//                        
//                        if self.therapyStage == .readyToCalibrate || self.therapyStage == .pause {
//                            // Case 2a: Person is detected + Not yet calibrated
//                            // Proceed pose skeleton data and check whether the person is inside the calibration bound
//                            // Also start progress circle (count down for 5 seconds)
//                            // Remark: Use displayPose because world landmarks are not normalized
//                            if let poseCalibration = self.poseCalibration,
//                               let displayPose = self.displayPose {
//                                
//                                let calibrationReminderMessage = poseCalibration.execReminderMessage(pose: displayPose)
//                                DispatchQueue.main.async {
//                                    self.reminderLabel.text = calibrationReminderMessage
//                                }
//                                if calibrationReminderMessage != nil {
//                                    // There is error message
//                                    // Person outside the bound, set calibration image color to red
//                                    self.setPoseCalibrationImageView(isDetected: false)
//                                    self.countdownProgressCircleView.hideProgressCircle()
//                                } else {
//                                    // Person inside the bound, set calibration image color to green
//                                    self.setPoseCalibrationImageView(isDetected: true)
//                                    self.countdownProgressCircleView.beginProgressCircle(duration: K.CameraView.calibrationRequiredTime) { [weak self] count in
//                                        if count == 3 {
//                                            self?.playSoundForProgress(progress: .three)
//                                        } else if count == 2 {
//                                            self?.playSoundForProgress(progress: .two)
//                                        } else if count == 1 {
//                                            self?.playSoundForProgress(progress: .one)
//                                        } else if count <= 0 {
//                                            self?.changeTherapyStage(.duringTherapy)
//                                        }
//                                    }
//                                }
//                                
//                            } else {
//                                // Person outside the bound, set calibration image color to red
//                                DispatchQueue.main.async {
//                                    self.reminderLabel.text = nil
//                                }
//                                self.setPoseCalibrationImageView(isDetected: false)
//                                self.countdownProgressCircleView.hideProgressCircle()
//                            }
//                        } else if self.therapyStage == .duringTherapy {
//                            // Case 2b: Person is detected + Have calibrated already
//                            // Send the pose data for calculation
//                            try self.checkCount(pose, nil, Date())
//                        }
//                    } catch {
//                        if #available(iOS 14.0, *) {
//                            os_log("\(error.localizedDescription)")
//                        }
//                    }
//                }
//
//            } else {
//                self.displayPose = nil
//            }
//            
//        }
//        
//        // Reset the flag to indicate that the function has finished
//        self.isDidOutputLandmarksFunctionRunning = false
//    }
//    
//    // Use this world landmarks list for calculation
//    func poseAndHandTracker(_ tracker: PoseAndHandTracker!, didOutputPoseWorldLandmarks worldLandmarks: [Landmark]!, timestamp time: CMTime) {
////        if self.currentTherapyMode == .pose {
////            // Case 2: Person is detected
////            if let poseCheckComplete = self.poseCheckComplete {
////                do {
////                    poseCheckComplete.createWorldPose(worldLandmarks: worldLandmarks, isLeftRightExchange: self.cameraSide == .front)
////                    // End count down clock timer
////                    self.endNoPersonCountDownClock()
////
////                    if self.therapyStage == .readyToCalibrate || self.therapyStage == .pause {
////                        // Case 2a: Person is detected + Not yet calibrated
////                        // Proceed pose skeleton data and check whether the person is inside the calibration bound
////                        // Also start progress circle (count down for 5 seconds)
////                        // Remark: Use displayPose because world landmarks are not normalized
////                        if let poseCalibration = self.poseCalibration,
////                           let displayPose = self.displayPose,
////                           poseCalibration.exec(pose: displayPose) {
////                            // Person inside the bound, set calibration image color to green
////                            self.setPoseCalibrationImageView(isDetected: true)
////                            self.countdownProgressCircleView.beginProgressCircle(duration: K.CameraView.calibrationRequiredTime) { count in
////                                if count == 3 {
////                                    self.playSoundForProgress(progress: .three)
////                                } else if count == 2 {
////                                    self.playSoundForProgress(progress: .two)
////                                } else if count == 1 {
////                                    self.playSoundForProgress(progress: .one)
////                                } else if count < 1 {
////                                    self.changeTherapyStage(.duringTherapy)
////                                }
////                            }
////                        } else {
////                            // Person outside the bound, set calibration image color to red
////                            self.setPoseCalibrationImageView(isDetected: false)
////                            self.countdownProgressCircleView.hideProgressCircle()
////                        }
////                    } else if self.therapyStage == .duringTherapy {
////                        // Case 2b: Person is detected + Have calibrated already
////                        // Send the pose data for calculation
////                        try self.checkCount(Date())
////                    }
////                } catch {
////                    if #available(iOS 14.0, *) {
////                        os_log("\(error.localizedDescription)")
////                    }
////                }
////            }
////        }
//    }
//    
//    
//    func poseAndHandTracker(_ tracker: PoseAndHandTracker!, didOutputPosePresence isPresence: Bool, timestamp time: CMTime) {
//        if self.currentTherapyMode == .pose {
//            // isPoseDetected changes to false only if consecutive number of same state occurs
//            if isPresence {
//                self.isDetected = isPresence
//                self.isDetectedConsecutiveFrames = 0
//            } else {
//                self.isDetectedConsecutiveFrames += 1
//                if self.isDetectedConsecutiveFrames > K.PoseTherapy.isPoseDetectedConsecutiveFrameThreshold {
//                    self.isDetected = isPresence
//                    self.isDetectedConsecutiveFrames = 0
//                }
//            }
//            
//            // Case 1: No person is detected
//            if !self.isDetected {
//                // Hide pose skeleton
//                self.displayPose = nil
//
//                // Reset count down clock (for alert view and auto-dismiss)
//                self.restartNoPersonCountDownClock()
//                
//                if self.therapyStage == .readyToCalibrate || self.therapyStage == .pause {
//                    // Case 1a: No person is detected + Not yet calibrated
//                    // Hide progress circle and set calibration image color to red
//                    self.setPoseCalibrationImageView(isDetected: false)
//                    self.countdownProgressCircleView.hideProgressCircle()
//                } else if self.therapyStage == .duringTherapy {
//                    // Case 1b: No person is detected + Have calibrated already
//                    // Set the score to 0 (hide it) and clear this count data
//                    self.clearCountData()
//                }
//            }
//        }
//    }
//    
//    
//    func drawPoseImage(_ displayPose: Pose) {
//        if let cc = self.poseCheckComplete,
//           let overlayViewImage = self.overlayView.image {
//            let overlayViewExtraInformation = OverlayViewExtraInformation(
//                image: overlayViewImage,
//                displayPose: displayPose,
//                therapyStage: self.therapyStage,
//                therapyCode: self.currentTherapy!.code,
//                therapySide: self.currentTherapy!.side,
//                gravityDegrees: self.gravityDegrees,
//                initialAnklePoint: cc.initialAnklePoint,
//                initialBodyMidLineEquation: cc.initialBodyMidLineEquation
//            )
//            self.overlayView.draw(overlayViewExtraInformation)
//        }
//    }
//    
//    
//    // MARK: - Hand Therapy Outputs
//    
//    func poseAndHandTracker(_ tracker: PoseAndHandTracker!, didOutputHand landmarks: [Landmark]!, timestamp time: CMTime) {
//        self.detectionQueue.async {
//            // Check if the function is already running
//            guard !self.isDidOutputLandmarksFunctionRunning else {
//                // Ignore the request if the function is still running
//                return
//            }
//        }
//        
//        // Set the flag to indicate that the function is running
//        self.isDidOutputLandmarksFunctionRunning = true
//        
//        if self.currentTherapyMode == .hand {
//            if self.therapyStage == .readyToCalibrate || self.therapyStage == .duringTherapy || self.therapyStage == .pause {
//                // Draw pose skeletonr
//                let hand = Hand(landmarks)
//                self.displayHand = hand
//                
//                // Case 2: Hand is detected
//                if self.handCheckComplete != nil {
//                    do {
//                        // End count down clock timer
//                        self.endNoPersonOrHandCountDownClock()
//                        
//                        if self.therapyStage == .readyToCalibrate || self.therapyStage == .pause {
//                            // Case 2a: Hand is detected + Not yet calibrated
//                            // Proceed hand skeleton data and check whether the hand is inside the calibration bound
//                            // Also start progress circle (count down for 5 seconds)
//                            // Remark: Use displayHand because world landmarks are not normalized
//                            if let handCalibration = self.handCalibration,
//                               let displayHand = self.displayHand {
//                                let calibrationReminderMessage = handCalibration.execReminderMessage(hand: displayHand, plannedTherapy: self.currentPlannedTherapy!)
//                                DispatchQueue.main.async {
//                                    self.reminderLabel.text = calibrationReminderMessage
//                                }
//                                if calibrationReminderMessage != nil {
//                                    // There is error message
//                                    // Hand outside the bound, set calibration image color to red
//                                    self.setHandCalibrationImageView(isDetected: false)
//                                    self.countdownProgressCircleView.hideProgressCircle()
//                                } else {
//                                    // Hand inside the bound, set calibration image color to green
//                                    self.setHandCalibrationImageView(isDetected: true)
//                                    self.countdownProgressCircleView.beginProgressCircle(duration: K.CameraView.calibrationRequiredTime) { [weak self] count in
//                                        if count == 3 {
//                                            self?.playSoundForProgress(progress: .three)
//                                        } else if count == 2 {
//                                            self?.playSoundForProgress(progress: .two)
//                                        } else if count == 1 {
//                                            self?.playSoundForProgress(progress: .one)
//                                        } else if count <= 0 {
//                                            self?.changeTherapyStage(.duringTherapy)
//                                        }
//                                    }
//                                }
//                                
//                            } else {
//                                // Hand outside the bound, set calibration image color to red
//                                DispatchQueue.main.async {
//                                    self.reminderLabel.text = nil
//                                }
//                                self.setHandCalibrationImageView(isDetected: false)
//                                self.countdownProgressCircleView.hideProgressCircle()
//                            }
//                        } else if self.therapyStage == .duringTherapy {
//                            // Case 2b: Person is detected + Have calibrated already
//                            // Send the pose data for calculation
//                            try self.checkCount(nil, hand, Date())
//                        }
//                    } catch {
//                        if #available(iOS 14.0, *) {
//                            os_log("\(error.localizedDescription)")
//                        }
//                    }
//                }
//
//            } else {
//                self.displayPose = nil
//            }
//            
//        }
//        
//        // Reset the flag to indicate that the function has finished
//        self.isDidOutputLandmarksFunctionRunning = false
//    }
//    
//    
//    func poseAndHandTracker(_ tracker: PoseAndHandTracker!, didOutputHandWorldLandmarks worldLandmarks: [Landmark]!, timestamp time: CMTime) {
//    }
//    
//    
//    func poseAndHandTracker(_ tracker: PoseAndHandTracker!, didOutputHandPresence isPresence: Bool, timestamp time: CMTime) {
//        if self.currentTherapyMode == .hand {
//            // isPoseDetected changes to false only if consecutive number of same state occurs
//            if isPresence {
//                self.isDetected = isPresence
//                self.isDetectedConsecutiveFrames = 0
//            } else {
//                self.isDetectedConsecutiveFrames += 1
//                if self.isDetectedConsecutiveFrames > K.PoseTherapy.isPoseDetectedConsecutiveFrameThreshold {
//                    self.isDetected = isPresence
//                    self.isDetectedConsecutiveFrames = 0
//                }
//            }
//            
//            // Case 1: No person is detected
//            if !self.isDetected {
//                // Hide pose skeleton
//                self.displayHand = nil
//
//                // Reset count down clock (for alert view and auto-dismiss)
//                self.restartNoPersonCountDownClock()
//                
//                if self.therapyStage == .readyToCalibrate || self.therapyStage == .pause {
//                    // Case 1a: No person is detected + Not yet calibrated
//                    // Hide progress circle and set calibration image color to red
//                    self.setHandCalibrationImageView(isDetected: false)
//                    self.countdownProgressCircleView.hideProgressCircle()
//                } else if self.therapyStage == .duringTherapy {
//                    // Case 1b: No person is detected + Have calibrated already
//                    // Set the score to 0 (hide it) and clear this count data
//                    self.clearCountData()
//                }
//            }
//        }
//    }
//    
//    
//    func poseAndHandTracker(_ tracker: PoseAndHandTracker!, didOutputHandSide isLeftHandForFrontCamera: Bool, timestamp time: CMTime) {
//        // TODO: Implement Hand Model
//    }
//    
//    
//    func drawHandImage(_ displayHand: Hand) {
//        if let overlayViewImage = self.overlayView.image {
//            let overlayViewExtraInformation = OverlayViewExtraInformation(
//                image: overlayViewImage,
//                displayHand: displayHand,
//                therapyStage: self.therapyStage,
//                therapyCode: self.currentTherapy!.code,
//                therapySide: self.currentTherapy!.side,
//                gravityDegrees: self.gravityDegrees
//            )
//            self.overlayView.draw(overlayViewExtraInformation)
//        }
//    }
//    
//    
//}
