//
//  Criteria.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 21/4/2024.
//

struct Criteria {
  
    /// key point angle for this criteria (nil if the criteria is not based on angles)
  let angles: KeyPointAngle?
    /// side of this criteria
  let side: Side
    /// weight of this criteria
  let weight: Double
    /// feedbacks of this criteria
  let feedbacks: [Feedback]
    /// whether is this criteria is for counting
  let isForCounting: Bool
    /// whether is this criteria is for secondary
  let isForSecondary: Bool
  
  init(angles: KeyPointAngle?, side: Side, weight: Double = 1.0, feedbacks: [Feedback], isForCounting: Bool = false, isForSecondary: Bool = false) {
    self.angles = angles
    self.side = side
    self.weight = weight
    self.feedbacks = feedbacks
    self.isForCounting = isForCounting
    self.isForSecondary = isForSecondary
  }
  
}


extension Criteria: Equatable {
  
  static func == (lhs: Criteria, rhs: Criteria) -> Bool {
    lhs.angles == rhs.angles
  }
  
}
