//
//  PoseLandmarkerService.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 13/4/2024.
//

import UIKit
import MediaPipeTasksVision
import AVFoundation

/**
 This protocol must be adopted by any class that wants to get the detection results of the pose landmarker in live stream mode.
 */
protocol PoseLandmarkerServiceLiveStreamDelegate: AnyObject {
  func poseLandmarkerService(_ poseLandmarkerService: PoseLandmarkerService,
                             didFinishDetection result: ResultBundle?,
                             error: Error?)
}

/**
 This protocol must be adopted by any class that wants to take appropriate actions during different stages of pose landmark on videos.
 */
protocol PoseLandmarkerServiceVideoDelegate: AnyObject {
  func poseLandmarkerService(_ poseLandmarkerService: PoseLandmarkerService,
                             didFinishDetectionOnVideoFrame index: Int)
  func poseLandmarkerService(_ poseLandmarkerService: PoseLandmarkerService,
                             willBeginDetection totalframeCount: Int)
}


  // Initializes and calls the MediaPipe APIs for detection.
class PoseLandmarkerService: NSObject {
  
    // Delegate for live stream processing
  weak var liveStreamDelegate: PoseLandmarkerServiceLiveStreamDelegate?
    // Delegate for video processing
  weak var videoDelegate: PoseLandmarkerServiceVideoDelegate?
  
    // Instance of the PoseLandmarker class
  var poseLandmarker: PoseLandmarker?
    // Running mode, default is image/
  private(set) var runningMode = RunningMode.image
    // Number of poses
  private var numPoses: Int
    // Minimum confidence required for pose detection
  private var minPoseDetectionConfidence: Float
    // Minimum confidence required for presence of a pose
  private var minPosePresenceConfidence: Float
    // Minimum confidence required for pose tracking
  private var minTrackingConfidence: Float
    // Path to the model used for pose estimation
  private var modelPath: String
    // Delegate for pose landmarker events
  private var delegate: PoseLandmarkerDelegate
  
    // MARK: - Custom Initializer
  
  private init?(modelPath: String?,
                runningMode: RunningMode,
                numPoses: Int,
                minPoseDetectionConfidence: Float,
                minPosePresenceConfidence: Float,
                minTrackingConfidence: Float,
                delegate: PoseLandmarkerDelegate) {
      // Check if model path is provided
    guard let modelPath = modelPath else { return nil }
    self.modelPath = modelPath
    self.runningMode = runningMode
    self.numPoses = numPoses
    self.minPoseDetectionConfidence = minPoseDetectionConfidence
    self.minPosePresenceConfidence = minPosePresenceConfidence
    self.minTrackingConfidence = minTrackingConfidence
    self.delegate = delegate
    
    super.init()
    
    createPoseLandmarker()
  }
  
  
  private func createPoseLandmarker() {
      // Create an instance of PoseLandmarkerOptions
    let poseLandmarkerOptions = PoseLandmarkerOptions()
    
      // Set the options based on the provided values
    poseLandmarkerOptions.runningMode = runningMode
    poseLandmarkerOptions.numPoses = numPoses
    poseLandmarkerOptions.minPoseDetectionConfidence = minPoseDetectionConfidence
    poseLandmarkerOptions.minPosePresenceConfidence = minPosePresenceConfidence
    poseLandmarkerOptions.minTrackingConfidence = minTrackingConfidence
    
      // Set the model asset path and delegate in the base options of PoseLandmarkerOptions
    poseLandmarkerOptions.baseOptions.modelAssetPath = modelPath
    poseLandmarkerOptions.baseOptions.delegate = delegate.delegate
    
      // Set the pose landmarker live stream delegate if the running mode is live stream
    if runningMode == .liveStream {
      poseLandmarkerOptions.poseLandmarkerLiveStreamDelegate = self
    }
    
    do {
        // Create an instance of PoseLandmarker using the configured options
      poseLandmarker = try PoseLandmarker(options: poseLandmarkerOptions)
    } catch {
        // Handle any errors that occur during the creation of PoseLandmarker
      print(error)
    }
  }
  
  
    // MARK: - Static Initializers
  
  static func videoPoseLandmarkerService(
    modelPath: String?,
    numPoses: Int,
    minPoseDetectionConfidence: Float,
    minPosePresenceConfidence: Float,
    minTrackingConfidence: Float,
    videoDelegate: PoseLandmarkerServiceVideoDelegate?,
    delegate: PoseLandmarkerDelegate) -> PoseLandmarkerService? {
        // Create a PoseLandmarkerService instance with the provided parameters for video processing
      let poseLandmarkerService = PoseLandmarkerService(
        modelPath: modelPath,
        runningMode: .video,
        numPoses: numPoses,
        minPoseDetectionConfidence: minPoseDetectionConfidence,
        minPosePresenceConfidence: minPosePresenceConfidence,
        minTrackingConfidence: minTrackingConfidence,
        delegate: delegate)
      
        // Set the video delegate of the PoseLandmarkerService
      poseLandmarkerService?.videoDelegate = videoDelegate
      
      return poseLandmarkerService
    }
  
  
  static func liveStreamPoseLandmarkerService(
    modelPath: String?,
    numPoses: Int,
    minPoseDetectionConfidence: Float,
    minPosePresenceConfidence: Float,
    minTrackingConfidence: Float,
    liveStreamDelegate: PoseLandmarkerServiceLiveStreamDelegate?,
    delegate: PoseLandmarkerDelegate) -> PoseLandmarkerService? {
        // Create a PoseLandmarkerService instance with the provided parameters for live stream processing
      let poseLandmarkerService = PoseLandmarkerService(
        modelPath: modelPath,
        runningMode: .liveStream,
        numPoses: numPoses,
        minPoseDetectionConfidence: minPoseDetectionConfidence,
        minPosePresenceConfidence: minPosePresenceConfidence,
        minTrackingConfidence: minTrackingConfidence,
        delegate: delegate)
      
        // Set the live stream delegate of the PoseLandmarkerService
      poseLandmarkerService?.liveStreamDelegate = liveStreamDelegate
      
      return poseLandmarkerService
    }
  
  
  static func stillImageLandmarkerService(
    modelPath: String?,
    numPoses: Int,
    minPoseDetectionConfidence: Float,
    minPosePresenceConfidence: Float,
    minTrackingConfidence: Float,
    delegate: PoseLandmarkerDelegate) -> PoseLandmarkerService? {
        // Create a PoseLandmarkerService instance with the provided parameters for still image processing
      let poseLandmarkerService = PoseLandmarkerService(
        modelPath: modelPath,
        runningMode: .image,
        numPoses: numPoses,
        minPoseDetectionConfidence: minPoseDetectionConfidence,
        minPosePresenceConfidence: minPosePresenceConfidence,
        minTrackingConfidence: minTrackingConfidence,
        delegate: delegate)
      
      return poseLandmarkerService
    }
  
  
  
    // MARK: - Detection Methods for Different Modes
  
  /**
   This method returns a ResultBundle containing PoseLandmarkerResult and inferenceTime when receiving an image.
   **/
  func detect(image: UIImage) -> ResultBundle? {
      // Convert the UIImage to MPImage
    guard let mpImage = try? MPImage(uiImage: image) else {
      return nil
    }
    
    do {
      let startDate = Date()
        // Perform pose landmark detection on the MPImage
      let result = try poseLandmarker?.detect(image: mpImage)
      let inferenceTime = Date().timeIntervalSince(startDate) * 1000
      return ResultBundle(inferenceTime: inferenceTime, poseLandmarkerResults: [result])
    } catch {
      print(error)
      return nil
    }
  }
  
  /**
   This method asynchronously detects pose landmarks in a sample buffer from a video stream.
   **/
  func detectAsync(
    sampleBuffer: CMSampleBuffer,
    orientation: UIImage.Orientation,
    timeStamps: Int) {
        // Convert the CMSampleBuffer to MPImage
      guard let image = try? MPImage(sampleBuffer: sampleBuffer, orientation: orientation) else {
        return
      }
      
      do {
          // Perform asynchronous pose landmark detection on the MPImage
        try poseLandmarker?.detectAsync(image: image, timestampInMilliseconds: timeStamps)
      } catch {
        print(error)
      }
    }
  
  /**
   This method detects pose landmarks in a video asset.
   **/
  func detect(
    videoAsset: AVAsset,
    durationInMilliseconds: Double,
    inferenceIntervalInMilliseconds: Double) async -> ResultBundle? {
      let startDate = Date()
      
        // Create an AVAssetImageGenerator to generate frames from the video asset
      let assetGenerator = imageGenerator(with: videoAsset)
      
      let frameCount = Int(durationInMilliseconds / inferenceIntervalInMilliseconds)
      
        // Notify the video delegate that the detection is about to begin
      Task { @MainActor in
        videoDelegate?.poseLandmarkerService(self, willBeginDetection: frameCount)
      }
      
        // Perform pose landmark detection on the generated frames at regular intervals
      let poseLandmarkerResultTuple = detectPoseLandmarksInFramesGenerated(
        by: assetGenerator,
        totalFrameCount: frameCount,
        atIntervalsOf: inferenceIntervalInMilliseconds)
      
        // Calculate the average inference time per frame
      return ResultBundle(
        inferenceTime: Date().timeIntervalSince(startDate) / Double(frameCount) * 1000,
        poseLandmarkerResults: poseLandmarkerResultTuple.poseLandmarkerResults,
        size: poseLandmarkerResultTuple.videoSize)
    }
  
  /**
   This private method creates an AVAssetImageGenerator with appropriate settings for frame extraction.
   **/
  private func imageGenerator(with videoAsset: AVAsset) -> AVAssetImageGenerator {
    let generator = AVAssetImageGenerator(asset: videoAsset)
    generator.requestedTimeToleranceBefore = CMTimeMake(value: 1, timescale: 25)
    generator.requestedTimeToleranceAfter = CMTimeMake(value: 1, timescale: 25)
    generator.appliesPreferredTrackTransform = true
    
    return generator
  }
  
  /**
   This private method performs pose landmark detection on frames generated by an AVAssetImageGenerator.
   **/
  private func detectPoseLandmarksInFramesGenerated(
    by assetGenerator: AVAssetImageGenerator,
    totalFrameCount frameCount: Int,
    atIntervalsOf inferenceIntervalMs: Double)
  -> (poseLandmarkerResults: [PoseLandmarkerResult?], videoSize: CGSize)  {
    var poseLandmarkerResults: [PoseLandmarkerResult?] = []
    var videoSize = CGSize.zero
    
      // Iterate over the frames and perform pose landmark detection on each frame
    for i in 0..<frameCount {
      let timestampMs = Int(inferenceIntervalMs) * i // ms
      let image: CGImage
      do {
          // Retrieve the CGImage for the current timestamp from the AVAssetImageGenerator
        let time = CMTime(value: Int64(timestampMs), timescale: 1000)
        image = try assetGenerator.copyCGImage(at: time, actualTime: nil)
      } catch {
        print(error)
        return (poseLandmarkerResults, videoSize)
      }
      
        // Convert the CGImage to UIImage
      let uiImage = UIImage(cgImage:image)
      videoSize = uiImage.size
      
      do {
          // Perform pose landmark detection on the video frame
        let result = try poseLandmarker?.detect(
          videoFrame: MPImage(uiImage: uiImage),
          timestampInMilliseconds: timestampMs)
        poseLandmarkerResults.append(result)
        
          // Notify the video delegate that detection has finished on the current video frame
        Task { @MainActor in
          videoDelegate?.poseLandmarkerService(self,didFinishDetectionOnVideoFrame: i)
        }
      } catch {
        print(error)
      }
    }
    
    return (poseLandmarkerResults, videoSize)
  }
}

  // MARK: - PoseLandmarkerLiveStreamDelegate Methods

extension PoseLandmarkerService: PoseLandmarkerLiveStreamDelegate {
  func poseLandmarker(
    _ poseLandmarker: PoseLandmarker,
    didFinishDetection result: PoseLandmarkerResult?,
    timestampInMilliseconds: Int,
    error: (any Error)?
  ) {
      // Calculate the inference time based on the timestamp and the current time
    let inferenceTime = Date().timeIntervalSince1970 * 1000 - Double(timestampInMilliseconds)
    
      // Create a ResultBundle with the inference time and the detection result
    let resultBundle = ResultBundle(
      inferenceTime: inferenceTime,
      poseLandmarkerResults: [result]
    )
    
      // Notify the live stream delegate about the detection result
    liveStreamDelegate?.poseLandmarkerService(
      self,
      didFinishDetection: resultBundle,
      error: error
    )
  }
}

  /// A result from the `PoseLandmarkerService`.
struct ResultBundle {
  let inferenceTime: Double
  let poseLandmarkerResults: [PoseLandmarkerResult?]
  var size: CGSize = .zero
}
