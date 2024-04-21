//
//  FrameResult.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 21/4/2024.
//

struct FrameResult {
    /// timestamp of this frame
  var timeStamp: Date
    /// result value of counting criteria
  var resultValue_CountingCriteria: Double
    /// score of counting criteria
  var score_CountingCriteria: Double
    /// level of counting criteria
  var level_CountingCriteria: Level
    /// score after calculation with weights
  var weightedScore: Double
    /// a list of dictionaries to store extra information
  var extraInformation: [String: Double]
    /// current count
  var currentCount: Int
}
