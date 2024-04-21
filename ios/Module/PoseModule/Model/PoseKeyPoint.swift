//
//  PoseKeyPoint.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 21/4/2024.
//

import MediaPipeTasksVision

protocol KeyPoint: Equatable {
  
  var point: Point3D? { get }
  static func == (lhs: Self, rhs: Self) -> Bool
  
}


class PoseKeyPoint: KeyPoint {
  
  let keyPointNumber: Int
  let posePartName: PosePartName
  let side: Side
  let point: Point3D?
  
    // Total number of pose key points
  static let totalNumber: Int = 33
  
  init(_ posePartName: PosePartName, _ side: Side, _ landmark: NormalizedLandmark? = nil) {
    self.posePartName = posePartName
    self.side = side
    if let landmark = landmark {
      self.point = Point3D(landmark)
    } else {
      self.point = nil
    }
    self.keyPointNumber = PoseKeyPoint.getKeyPointNumber(posePartName, side)
  }
  
  
  convenience init?(keyPointNumber: Int, landmark: NormalizedLandmark) {
    switch keyPointNumber {
      case 0:
        self.init(.nose, .both, landmark)
      case 1:
        self.init(.eyeInner, .left, landmark)
      case 2:
        self.init(.eye, .left, landmark)
      case 3:
        self.init(.eyeOuter, .left, landmark)
      case 4:
        self.init(.eyeInner, .right, landmark)
      case 5:
        self.init(.eye, .right, landmark)
      case 6:
        self.init(.eyeOuter, .right, landmark)
      case 7:
        self.init(.ear, .left, landmark)
      case 8:
        self.init(.ear, .right, landmark)
      case 9:
        self.init(.mouth, .left, landmark)
      case 10:
        self.init(.mouth, .right, landmark)
      case 11:
        self.init(.shoulder, .left, landmark)
      case 12:
        self.init(.shoulder, .right, landmark)
      case 13:
        self.init(.elbow, .left, landmark)
      case 14:
        self.init(.elbow, .right, landmark)
      case 15:
        self.init(.wrist, .left, landmark)
      case 16:
        self.init(.wrist, .right, landmark)
      case 17:
        self.init(.pinky, .left, landmark)
      case 18:
        self.init(.pinky, .right, landmark)
      case 19:
        self.init(.index, .left, landmark)
      case 20:
        self.init(.index, .right, landmark)
      case 21:
        self.init(.thumb, .left, landmark)
      case 22:
        self.init(.thumb, .right, landmark)
      case 23:
        self.init(.hip, .left, landmark)
      case 24:
        self.init(.hip, .right, landmark)
      case 25:
        self.init(.knee, .left, landmark)
      case 26:
        self.init(.knee, .right, landmark)
      case 27:
        self.init(.ankle, .left, landmark)
      case 28:
        self.init(.ankle, .right, landmark)
      case 29:
        self.init(.heel, .left, landmark)
      case 30:
        self.init(.heel, .right, landmark)
      case 31:
        self.init(.footIndex, .left, landmark)
      case 32:
        self.init(.footIndex, .right, landmark)
      default:
        return nil
    }
  }
  
  
  public func removeLandmark() -> PoseKeyPoint {
    return PoseKeyPoint(self.posePartName, self.side)
  }
  
  
  static func getKeyPointNumber(_ posePartName: PosePartName, _ side: Side) -> Int {
    var keyPointNumber: Int
    switch posePartName {
      case .nose:
        keyPointNumber = 0
      case .eyeInner:
        if side == .left {
          keyPointNumber = 1
        } else {
          keyPointNumber = 4
        }
      case .eye:
        if side == .left {
          keyPointNumber = 2
        } else {
          keyPointNumber = 5
        }
      case .eyeOuter:
        if side == .left {
          keyPointNumber = 3
        } else {
          keyPointNumber = 6
        }
      case .ear:
        if side == .left {
          keyPointNumber = 7
        } else {
          keyPointNumber = 8
        }
      case .mouth:
        if side == .left {
          keyPointNumber = 9
        } else {
          keyPointNumber = 10
        }
      case .shoulder:
        if side == .left {
          keyPointNumber = 11
        } else {
          keyPointNumber = 12
        }
      case .elbow:
        if side == .left {
          keyPointNumber = 13
        } else {
          keyPointNumber = 14
        }
      case .wrist:
        if side == .left {
          keyPointNumber = 15
        } else {
          keyPointNumber = 16
        }
      case .pinky:
        if side == .left {
          keyPointNumber = 17
        } else {
          keyPointNumber = 18
        }
      case .index:
        if side == .left {
          keyPointNumber = 19
        } else {
          keyPointNumber = 20
        }
      case .thumb:
        if side == .left {
          keyPointNumber = 21
        } else {
          keyPointNumber = 22
        }
      case .hip:
        if side == .left {
          keyPointNumber = 23
        } else {
          keyPointNumber = 24
        }
      case .knee:
        if side == .left {
          keyPointNumber = 25
        } else {
          keyPointNumber = 26
        }
      case .ankle:
        if side == .left {
          keyPointNumber = 27
        } else {
          keyPointNumber = 28
        }
      case .heel:
        if side == .left {
          keyPointNumber = 29
        } else {
          keyPointNumber = 30
        }
      case .footIndex:
        if side == .left {
          keyPointNumber = 31
        } else {
          keyPointNumber = 32
        }
    }
    return keyPointNumber
  }
  
}


extension PoseKeyPoint: Equatable, Hashable {
  
  static func ==(lhs: PoseKeyPoint, rhs: PoseKeyPoint) -> Bool {
    return lhs.keyPointNumber == rhs.keyPointNumber
  }
  
  func hash(into hasher: inout Hasher) {
    hasher.combine(self.keyPointNumber)
    hasher.combine(self.posePartName)
  }
  
}


extension Array where Element == PoseKeyPoint {
  
  func getKeyPoint(_ name: PosePartName) -> PoseKeyPoint {
    return self.first(where: { $0.posePartName == name })!
  }
  
}
