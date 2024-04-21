//
//  Point3D.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 21/4/2024.
//

import AVFoundation
import MediaPipeTasksVision

class Point3D: CustomStringConvertible {
  
    // Define how to print out an object in terminal
  var description: String {
    return "Point3D: x=\(x.rounded(toPlaces: 4)) y=\(y.rounded(toPlaces: 4)) z=\(z.rounded(toPlaces: 4))"
  }
  
  var x: Double
  var y: Double
  var z: Double
  var vis: Double?
  var pres: Double?
  
  
  init(_ landmark: NormalizedLandmark) {
    self.x = Double(landmark.x)
    self.y = Double(landmark.y)
    self.z = Double(landmark.z)
  }
  
  
  init(x: Double, y: Double, z: Double) {
    self.x = x
    self.y = y
    self.z = z
  }
  
  
  public func toCGPoint(_ imageSize: CGSize) -> CGPoint {
    return CGPoint(
      x: self.x * imageSize.width,
      y: self.y * imageSize.height
    )
  }
  
  
    // MARK: - Remove axes
  
  public func removeAxis(_ axes: [Axis]) -> Point3D {
    var newX = self.x
    var newY = self.y
    var newZ = self.z
    if axes.contains(.X) {
      newX = 0.0
    }
    if axes.contains(.Y) {
      newY = 0.0
    }
    if axes.contains(.Z) {
      newZ = 0.0
    }
    return Point3D(x: newX, y: newY, z: newZ)
  }
  
}


extension Point3D: Hashable {
  
  static func == (lhs: Point3D, rhs: Point3D) -> Bool {
    return lhs.x == rhs.x && lhs.y == rhs.y && lhs.z == rhs.z
  }
  
  func hash(into hasher: inout Hasher) {
    hasher.combine(self.x)
    hasher.combine(self.y)
    hasher.combine(self.z)
  }
  
}


extension Point3D {
  
    // MARK: - Calculate Distance
  
  static func calculate3DDistance(_ pt1: Point3D, _ pt2: Point3D, _ axes: [Axis]) -> Double {
    var dist: Double = 0.0
    if axes.contains(.X) {
      dist += pow(pt1.x-pt2.x, 2)
    }
    if axes.contains(.Y) {
      dist += pow(pt1.y-pt2.y, 2)
    }
    if axes.contains(.Z) {
      dist += pow(pt1.z-pt2.z, 2)
    }
    return sqrt(dist)
  }
  
  
  static func calculate3DSignedDistance(from: Point3D, to: Point3D, signedAxis: Axis, fromAxes: [Axis]) -> Double {
    let distance = self.calculate3DDistance(from, to, fromAxes)
    switch signedAxis {
      case .X:
        if from.x >= to.x {
          return distance
        } else {
          return -distance
        }
      case .Y:
        if from.y >= to.y {
          return distance
        } else {
          return -distance
        }
      case .Z:
        if from.z >= to.z {
          return distance
        } else {
          return -distance
        }
    }
  }
  
  
    // MARK: - Calculate Angle
  
  static func calculate3DAngle(_ from: Point3D, _ center: Point3D, _ to: Point3D, axes: [Axis], isSigned: Bool = false) -> Double {
    let dist_a = self.calculate3DDistance(from, center, axes)
    let dist_b = self.calculate3DDistance(to, center, axes)
    let dist_c = self.calculate3DDistance(from, to, axes)
    let heron = ( pow(dist_a, 2) + pow(dist_b, 2) - pow(dist_c, 2) ) / ( 2 * dist_a * dist_b )
    if isSigned {
      return 180 - acos(heron) * (180/Double.pi)
    } else {
      return acos(heron) * (180/Double.pi)
    }
  }
  
  
    // MARK: - Calculate Mid Point
  
  static func calculate3DMidPoint(_ pt1: Point3D, _ pt2: Point3D) -> Point3D {
    return Point3D(x: Double(pt1.x + pt2.x) / 2.0,
                   y: Double(pt1.y + pt2.y) / 2.0,
                   z: Double(pt1.z + pt2.z) / 2.0)
  }
  
  
}
