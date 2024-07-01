//
//  Pose.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 21/4/2024.
//

import MediaPipeTasksVision

struct Pose {
  
  private var keyPoints: [PoseKeyPoint]
  
  init(_ landmarks: [NormalizedLandmark]) {
    self.keyPoints = []
    var newLandmarks = landmarks
    newLandmarks[0] = landmarks[0]
    newLandmarks[1] = landmarks[4]
    newLandmarks[2] = landmarks[5]
    newLandmarks[3] = landmarks[6]
    newLandmarks[4] = landmarks[1]
    newLandmarks[5] = landmarks[2]
    newLandmarks[6] = landmarks[3]
    for i in 7..<landmarks.count {
      if i % 2 == 1 {
        newLandmarks[i] = landmarks[i+1]
      } else {
        newLandmarks[i] = landmarks[i-1]
      }
    }
    for i in 0..<newLandmarks.count {
      if let newKeyPoint = PoseKeyPoint(keyPointNumber: i, landmark: newLandmarks[i]) {
        self.keyPoints.append(newKeyPoint)
      }
    }
  }
  
  
  public func getKeyPoint(_ keyPoint: PoseKeyPoint) -> PoseKeyPoint {
    if self.keyPoints.first(where: {
      $0.keyPointNumber == keyPoint.keyPointNumber
    }) == nil {
      print("keyPoint.keyPointNumber:", keyPoint.keyPointNumber)
    }
    return self.keyPoints.first(where: {
      $0.keyPointNumber == keyPoint.keyPointNumber
    })!
  }
  
  
  public func getKeyPoints(_ searchKeyPoints: [PoseKeyPoint]) -> [PoseKeyPoint] {
    return self.keyPoints.filter { keyPoint in
      searchKeyPoints.contains { searchKeyPoint in
        searchKeyPoint.keyPointNumber == keyPoint.keyPointNumber
      }
    }
  }
  
  
  public func getKeyPointByNumber(_ keyPointNumber: Int) -> PoseKeyPoint {
    return self.keyPoints.first(where: {
      $0.keyPointNumber == keyPointNumber
    })!
  }
  
}
