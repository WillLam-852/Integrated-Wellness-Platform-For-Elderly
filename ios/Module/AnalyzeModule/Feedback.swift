//
//  Feedback.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 21/4/2024.
//

struct Feedback {
    /// minimum and maximum result values of this feedback
  let resultValueRange: (Double, Double)
    /// minimum and maximum scores of this feedback (nil if trick movement)
  var scoreRange: (Double, Double)? = nil
    /// level of this feedback (nil if trick movement)
  var level: Level? = nil
    /// comment of this feedback
  let comment: String
  
    /// Return true if the given result value is inside resultValueRange
  func isResultValueInRange(_ resultValue: Double, _ disabilityFactor: Double?) -> Bool {
    let minimumResultValue = self.resultValueRange.0 * (disabilityFactor ?? 1.0)
    let maximumResultValue = self.resultValueRange.1 * (disabilityFactor ?? 1.0)
    if resultValue > minimumResultValue && resultValue <= maximumResultValue {
      return true
    } else {
      return false
    }
  }
  
    /// Return true if the given result value is inside resultValueRange
  func isResultValueInRangeInverse(_ resultValue: Double, _ disabilityFactor: Double?) -> Bool {
    let maximumResultValue = self.resultValueRange.0 * (disabilityFactor ?? 1.0)
    let minimumResultValue = self.resultValueRange.1 * (disabilityFactor ?? 1.0)
    if resultValue > minimumResultValue && resultValue <= maximumResultValue {
      return true
    } else {
      return false
    }
  }
}


extension Array where Element == Feedback {
  
    /// Calculate score of this criteria
  func calculateScore(_ resultValue: Double, _ disabilityFactor: Double?) -> Double {
    var isInverse: Bool = false
    
    if let level1Feedback = self.first(where: { $0.level == .level1 }) {
      if level1Feedback.resultValueRange.0 > level1Feedback.resultValueRange.1 {
        isInverse = true
      }
    }
        
    if !isInverse {
      
        // Check for each level to see if resultValue is inside that range
      for feedback in self {
        if feedback.isResultValueInRange(resultValue, disabilityFactor) {
          let minimumResultValue = feedback.resultValueRange.0 * (disabilityFactor ?? 1.0)
          let maximumResultValue = feedback.resultValueRange.1 * (disabilityFactor ?? 1.0)
          let minimumScore = feedback.scoreRange!.0
          let maximumScore = feedback.scoreRange!.1
          let score = minimumScore + (maximumScore - minimumScore) * (resultValue - minimumResultValue) / (maximumResultValue - minimumResultValue)
          return score
        }
      }
      
        // If the resultValue is outside the range, check if it is larger than level 1 or smaller than level 3
      if let level1Feedback = self.first(where: { $0.level == .level1 }),
         let level3Feedback = self.first(where: { $0.level == .level3 }) {
        if resultValue > level1Feedback.resultValueRange.1 * (disabilityFactor ?? 1.0) {
          return 100.0
        }
        if resultValue <= level3Feedback.resultValueRange.0 * (disabilityFactor ?? 1.0) {
          return 0.0
        }
      }
      
    } else {
      
        // Check for each level to see if resultValue is inside that range
      for feedback in self {
        if feedback.isResultValueInRangeInverse(resultValue, disabilityFactor) {
          let minimumResultValue = feedback.resultValueRange.1 * (disabilityFactor ?? 1.0)
          let maximumResultValue = feedback.resultValueRange.0 * (disabilityFactor ?? 1.0)
          let minimumScore = feedback.scoreRange!.1
          let maximumScore = feedback.scoreRange!.0
          let score = minimumScore + (maximumScore - minimumScore) * (resultValue - minimumResultValue) / (maximumResultValue - minimumResultValue)
          return score
        }
      }
      
        // If the resultValue is outside the range, check if it is larger than level 1 or smaller than level 3
      if let level1Feedback = self.first(where: { $0.level == .level1 }),
         let level3Feedback = self.first(where: { $0.level == .level3 }) {
        if resultValue < level1Feedback.resultValueRange.1 * (disabilityFactor ?? 1.0) {
          return 100.0
        }
        if resultValue > level3Feedback.resultValueRange.0 * (disabilityFactor ?? 1.0) {
          return 0.0
        }
      }
      
    }
    
    return 0.0
  }
  
  
    /// Calculate level of this criteria (Return nil if the score does not match any feedback level range)
  func calculateLevel(_ score: Double) -> Level {
      // Check for each level to see if score is inside that range
    for feedback in self {
      let minimumScore = feedback.scoreRange!.0
      let maximumScore = feedback.scoreRange!.1
      if score > minimumScore && score <= maximumScore {
        return feedback.level!
      }
    }
    
      // If the score is outside the range, check if it is larger than level 1 or smaller than level 3
    if let level1Feedback = self.first(where: { $0.level == .level1 }),
       let level3Feedback = self.first(where: { $0.level == .level3 }) {
      if score > level1Feedback.scoreRange!.1 {
        return .level1
      }
      if score <= level3Feedback.scoreRange!.0 {
        return .notInAny
      }
    }
    
    return .notInAny
  }
  
  
    /// Get comment of this criteria
  func getComment(_ level: Level) -> String? {
    var comment: String? = nil
    if let feedback = self.first(where: { $0.level == level }) {
      comment = feedback.comment
    }
    return comment
  }
  
  
    /// Get gold standard for this criteria (default as upper bound of level 1 score)
  func getGoldStandard() -> Double {
    let level1HighestValue = self.first(where: { $0.level == .level1 })!.resultValueRange.1
    return level1HighestValue
  }
  
  
    /// Get score threshold for this criteria (default as lower bound of level 2 score)
  func getScoreThreshold() -> Double {
    let level2LowestScore = self.first(where: { $0.level == .level2 })!.scoreRange!.0
    return level2LowestScore
  }
  
  
}
