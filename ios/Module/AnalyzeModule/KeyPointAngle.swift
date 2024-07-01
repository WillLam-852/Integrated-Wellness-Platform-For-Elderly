//
//  KeyPointAngle.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 21/4/2024.
//

struct KeyPointAngle {
  
  let from: any KeyPoint
  let center: any KeyPoint
  let to: any KeyPoint
    /// These key point angle depends on which axes (Default as X and Y axes)
  var axes: [Axis] = [.X, .Y]
  
  
  public func toString() -> String {
    var displayString: String = ""
    if let fromPoseKeyPoint = self.from as? PoseKeyPoint,
       let centerPoseKeyPoint = self.center as? PoseKeyPoint,
       let toPoseKeyPoint = self.to as? PoseKeyPoint {
      let poseKeyPoints: [PoseKeyPoint] = [fromPoseKeyPoint, centerPoseKeyPoint, toPoseKeyPoint]
      for poseKeyPoint in poseKeyPoints {
        if poseKeyPoint.side == .left {
          displayString += "Left"
        } else if poseKeyPoint.side == .right {
          displayString += "Right"
        }
        displayString += " \(poseKeyPoint.posePartName.rawValue)"
        if poseKeyPoint != poseKeyPoints.last! {
          displayString += " - "
        }
      }
    }
    return displayString
  }
  
  
  public func toPlaneString() -> String {
    var displayString: String = ""
    for axis in self.axes {
      if axis != self.axes.last! {
        displayString += "\(axis.rawValue)-"
      } else {
        displayString += "\(axis.rawValue)"
      }
    }
    return displayString
  }
  
}


extension KeyPointAngle: Equatable {
  
  static func ==(lhs: KeyPointAngle, rhs: KeyPointAngle) -> Bool {
      let lhsFrom = lhs.from as! PoseKeyPoint
      let rhsFrom = rhs.from as! PoseKeyPoint
      let lhsCenter = lhs.center as! PoseKeyPoint
      let rhsCenter = rhs.center as! PoseKeyPoint
      let lhsTo = lhs.to as! PoseKeyPoint
      let rhsTo = rhs.to as! PoseKeyPoint
      return lhsFrom == rhsFrom && lhsCenter == rhsCenter && lhsTo == rhsTo
  }
  
}
