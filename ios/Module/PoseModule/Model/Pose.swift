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
    for i in 0..<landmarks.count {
      if let newKeyPoint = PoseKeyPoint(keyPointNumber: i, landmark: landmarks[i]) {
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
