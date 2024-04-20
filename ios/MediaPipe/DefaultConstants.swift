//
//  DefaultConstants.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 13/4/2024.
//

import Foundation
import UIKit
import MediaPipeTasksVision

  // MARK: Define default constants
struct DefaultConstants {
  
    // Default values for line width, point radius, and colors
  static let lineWidth: CGFloat = 2
  static let pointRadius: CGFloat = 2
  static let pointColor = UIColor.yellow
  static let pointFillColor = UIColor.red
  
    // Default color for lines
  static let lineColor = UIColor(red: 0, green: 127/255.0, blue: 139/255.0, alpha: 1)
  
    // Default values for pose detection and tracking
  static var numPoses: Int = 1
  static var minPoseDetectionConfidence: Float = 0.5
  static var minPosePresenceConfidence: Float = 0.5
  static var minTrackingConfidence: Float = 0.5
  
    // Default model and delegate for pose landmarker
  static let model: Model = .pose_landmarker_lite
  static let delegate: PoseLandmarkerDelegate = .CPU
}

  // MARK: Model
enum Model: Int, CaseIterable {
  
    // Enum cases for different pose landmarker models
  case pose_landmarker_lite
  case pose_landmarker_full
  case pose_landmarker_heavy
  
    // Returns the name of the model
  var name: String {
    switch self {
      case .pose_landmarker_lite:
        return "Pose landmarker (lite)"
      case .pose_landmarker_full:
        return "Pose landmarker (Full)"
      case .pose_landmarker_heavy:
        return "Pose landmarker (Heavy)"
    }
  }
  
    // Returns the path to the model file
  var modelPath: String? {
    switch self {
      case .pose_landmarker_lite:
        return Bundle.main.path(
          forResource: "pose_landmarker_lite", ofType: "task")
      case .pose_landmarker_full:
        return Bundle.main.path(
          forResource: "pose_landmarker_full", ofType: "task")
      case .pose_landmarker_heavy:
        return Bundle.main.path(
          forResource: "pose_landmarker_heavy", ofType: "task")
    }
  }
  
    // Initializes a Model instance from its name
  init?(name: String) {
    switch name {
      case Model.pose_landmarker_lite.name:
        self = Model.pose_landmarker_lite
      case Model.pose_landmarker_full.name:
        self = Model.pose_landmarker_full
      case Model.pose_landmarker_heavy.name:
        self = Model.pose_landmarker_heavy
      default:
        return nil
    }
  }
}

  // MARK: PoseLandmarkerDelegate
enum PoseLandmarkerDelegate: CaseIterable {
  
    // Enum cases for different delegates
  case GPU
  case CPU
  
    // Returns the name of the delegate
  var name: String {
    switch self {
      case .GPU:
        return "GPU"
      case .CPU:
        return "CPU"
    }
  }
  
    // Returns the delegate type
  var delegate: Delegate {
    switch self {
      case .GPU:
        return .GPU
      case .CPU:
        return .CPU
    }
  }
  
    // Initializes a PoseLandmarkerDelegate instance from its name
  init?(name: String) {
    switch name {
      case PoseLandmarkerDelegate.CPU.name:
        self = PoseLandmarkerDelegate.CPU
      case PoseLandmarkerDelegate.GPU.name:
        self = PoseLandmarkerDelegate.GPU
      default:
        return nil
    }
  }
}
