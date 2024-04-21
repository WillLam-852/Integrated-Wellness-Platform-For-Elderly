//
//  ShownFrameInformation.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 21/4/2024.
//

  /// Frame information to be shown to user on screen in real-time
struct ShownFrameInformation {
    /// Current count
  let count: Int
    /// Current progress
  let progress: Int
    /// Current count state (current frame)
  let countState: Bool
    /// Result value of counting criteria (current frame)
  let resultValue: Double
    /// Score of counting criteria (current frame)
  let score: Double
    /// Level of counting criteria (current frame)
  let level: Level
    /// Level for voice feedback (last count)
  let levelLastCount: Level?
    /// Extra information to be shown
  let extraInformation: [String: Any]
}
