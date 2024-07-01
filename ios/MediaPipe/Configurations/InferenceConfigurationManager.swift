//
//  InferenceConfigurationManager.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 13/4/2024.
//

import Foundation

/**
 * Singleton storing the configs needed to initialize an MediaPipe Tasks object and run inference.
 * Controllers can observe the `InferenceConfigurationManager.notificationName` for any changes made by the user.
 */

class InferenceConfigurationManager: NSObject {
  
    // The model used for inference
  var model: Model = DefaultConstants.model {
    didSet { postConfigChangedNotification() }
  }
  
    // The delegate for handling pose landmarker events
  var delegate: PoseLandmarkerDelegate = DefaultConstants.delegate {
    didSet { postConfigChangedNotification() }
  }
  
    // The number of poses to be detected
  var numPoses: Int = DefaultConstants.numPoses {
    didSet { postConfigChangedNotification() }
  }
  
    // The minimum confidence threshold for pose detection
  var minPoseDetectionConfidence: Float = DefaultConstants.minPoseDetectionConfidence {
    didSet { postConfigChangedNotification() }
  }
  
    // The minimum confidence threshold for pose presence
  var minPosePresenceConfidence: Float = DefaultConstants.minPosePresenceConfidence {
    didSet { postConfigChangedNotification() }
  }
  
    // The minimum confidence threshold for pose tracking
  var minTrackingConfidence: Float = DefaultConstants.minTrackingConfidence {
    didSet { postConfigChangedNotification() }
  }
  
    // Singleton instance of InferenceConfigurationManager
  static let sharedInstance = InferenceConfigurationManager()
  
    // Notification name for configuration changes
  static let notificationName = Notification.Name.init(rawValue: K.NotificationName.inferenceConfigChanged)
  
    // Posts a notification when the configuration changes
  private func postConfigChangedNotification() {
    NotificationCenter.default
      .post(name: InferenceConfigurationManager.notificationName, object: nil)
  }
  
}
