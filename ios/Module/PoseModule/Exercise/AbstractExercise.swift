//
//  AbstractExercise.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 21/4/2024.
//

import AVFoundation

class AbstractExercise {
  
    // MARK: - Basic Information (defined in each exercise)
  
  var code: ExerciseCode = .E0
  var side: Side = .undefined
  var name: String = "Abstract Exercise Name"
  
    /// Criteria Sets of this exercise
  var criteriaSets: [[Criteria]] = []
  
    // MARK: - Basic Information (Get from above variables)
  
    /// Criteria for counting (get from criterias)
  var countingCriteria: Criteria {
    get {
      return self.criteriaSets[self.progress].first{ $0.isForCounting }!
    }
  }
    /// Gold standard for counting criteria (default as upper bound of level 1 score of counting criteria)
  var goldStandard_CountingCriteria: Double {
    get {
      self.countingCriteria.feedbacks.getGoldStandard()
    }
  }
    /// Score threshold for counting (If score of current frame is larger than threshold -> ON. If smaller than or equal to threshold -> OFF) (default as lower bound of level 2 score of counting criteria)
  var scoreThreshold_CountingCriteria: Double {
    get {
      return self.countingCriteria.feedbacks.getScoreThreshold()
    }
  }
  
    // MARK: - Information related to the user's plan
  
  var plan: Plan
    /// Personal Gold Standard of the patient for specific exercisef's counting criteria (default as goldStandard_CountingCriteria * disabilityFactor)
  var personalGoldStandard: Double {
    get {
      self.goldStandard_CountingCriteria * self.plan.disabilityFactor!
    }
  }

    // MARK: - Temporary Information (shown to user)
  
    /// Count of this exercise user has proceed
  var count: Int = 0
    /// Feedback about level of current count result (shown to user)
  var highestLevelForThisCount: Level = .notInAny
  
    // MARK: - Temporary Information (counting)
    /// Progress for the criteria sets
  var progress: Int = 0
    /// Index of this frame to ignore input (reduce memory used)
  var frameIndex: Int = 0
    /// Count State of this exercise  (false when start exercise)
  var countState: Bool = false
    /// Current number of same state before transition
  var countTransition: Int = 0
    /// Start time of the current count (nil if count not yet start) (used in E11 only)
  var countStartTime: Date? = nil
    /// Boolean about count state starts when start exercise (to avoid displaying tick when it just starts)
  var isCountStateStarted: Bool = false
  
    // MARK: - Constants
  
    /// Number of frames before proceed to analyze frame (reduce memory used)
  var frameIndexThreshold: Int = K.Exercise.frameIndexThreshold
    /// Number of same state required before transition (Change to 3 for E12 and E13)
  var countTransitionThreshold: Int {
    get {
      K.Exercise.countTransitionThreshold
    }
  }
  
  
    // MARK: - Initialization
  
  init(_ plan: Plan) {
    self.plan = plan
  }

  
    /// Method for analyzing the pose infromation (Used after calibration ONLY)
  public func check(_ pose: Pose, _ calculationExtraInformation: CalculationExtraInformation, isFirstStartCallback: @escaping () -> Void) throws -> ShownFrameInformation? {
      // First start exercise (right after calibration)
    if calculationExtraInformation.isFirstStart {
      try self.firstStartExercise(pose, isFirstStartCallback)
    }
    
    guard !self.criteriaSets.isEmpty else {
      print("[ERROR] criteriaSets is empty")
      return nil
    }

    let frameResult = try self.analyzeFrame(pose, calculationExtraInformation)
    
    let displayScore = !self.isCountStateStarted ? 0.0 : frameResult.score_CountingCriteria
    
    if frameResult.level_CountingCriteria > self.highestLevelForThisCount {
      self.highestLevelForThisCount = frameResult.level_CountingCriteria
    }
    let levelLastCount = self.highestLevelForThisCount
    
        
//      // Skip frame if the frameIndex is not zero (reduce memory use)
//    if self.frameIndex == 0 {
//      self.temporaryContainerDataHandler?.saveTemporaryFrameResult(frameResult: frameResult)
//    }
//    self.frameIndex += 1
//    if self.frameIndex >= self.frameIndexThreshold {
//      self.frameIndex = 0
//    }
    
    let newCountState = self.changeState(currentCountState: self.countState, frameResult: frameResult)
    self.countState = newCountState
        
    let shownFrameInformation = ShownFrameInformation(
      count: self.count,
      progress: self.progress,
      countState: newCountState,
      resultValue: frameResult.resultValue_CountingCriteria,
      score: displayScore,
      level: frameResult.level_CountingCriteria,
      levelLastCount: levelLastCount,
      extraInformation: frameResult.extraInformation
    )
    return shownFrameInformation
  }
  
  
    // MARK: - Analyze Frame Methods
  
  func analyzeFrame(_ pose: Pose, _ calculationExtraInformation: CalculationExtraInformation) throws -> FrameResult {
    var resultValue_CountingCriteria: Double? = nil
    var score_CountingCriteria: Double? = nil
    var level_CountingCriteria: Level? = nil
    var weightedScore: Double = 0.0
    var weights: Double = 0.0
    let extraInformation: [String: Double] = [:]
    
    for criteria in self.criteriaSets[self.progress] {
      let resultValue = try self.calculateResultValue(pose: pose, criteria: criteria, calculationExtraInformation: calculationExtraInformation)
      let score = self.calculateScore(resultValue, criteria, self.plan.disabilityFactor)
      let level = criteria.feedbacks.calculateLevel(score)
      weightedScore += score * criteria.weight
      weights += criteria.weight
      if criteria == self.countingCriteria {
        resultValue_CountingCriteria = resultValue
        score_CountingCriteria = score
        level_CountingCriteria = level
      }
    }
    weightedScore = weightedScore / weights
    
    let frameResult = FrameResult(
      timeStamp: calculationExtraInformation.timeStamp,
      resultValue_CountingCriteria: resultValue_CountingCriteria!,
      score_CountingCriteria: score_CountingCriteria!,
      level_CountingCriteria: level_CountingCriteria!,
      weightedScore: weightedScore,
      extraInformation: extraInformation,
      currentCount: self.count
    )
    return frameResult
  }
  
  
  func calculateResultValue(pose: Pose, criteria: Criteria, calculationExtraInformation: CalculationExtraInformation) throws -> Double {
    let keyPointAngle = criteria.angles!
    let fromPoint = pose.getKeyPoint(keyPointAngle.from as! PoseKeyPoint)
    let centerPoint = pose.getKeyPoint(keyPointAngle.center as! PoseKeyPoint)
    let toPoint = pose.getKeyPoint(keyPointAngle.to as! PoseKeyPoint)
    let axes = keyPointAngle.axes
    let angle = Point3D.calculate3DAngle(fromPoint.point!, centerPoint.point!, toPoint.point!, axes: axes)
    return angle
  }
  
  
  func calculateScore(_ resultValue: Double, _ criteria: Criteria, _ disabilityFactor: Double?) -> Double {
    var score: Double
    score = criteria.feedbacks.calculateScore(resultValue, disabilityFactor)
    return score
  }

  
    // MARK: - State Management Method
  
  func changeState(currentCountState: Bool, frameResult: FrameResult) -> Bool {
    if !self.isCountStateStarted {
      if frameResult.score_CountingCriteria <= self.scoreThreshold_CountingCriteria {
        self.isCountStateStarted = true
      }
      return false
    } else {
      switch currentCountState {
        case false:
          if frameResult.score_CountingCriteria > self.scoreThreshold_CountingCriteria {
            if self.countTransition < self.countTransitionThreshold {
              self.countTransition += 1
              return false
            } else {
              self.countStartTime = frameResult.timeStamp
              self.countTransition = 0
              return true
            }
          } else {
            self.countTransition = 0
            return false
          }
        case true:
          if frameResult.score_CountingCriteria > self.scoreThreshold_CountingCriteria {
            self.countTransition = 0
            return true
          } else {
            if self.countTransition < self.countTransitionThreshold {
              self.countTransition += 1
              return true
            } else {
              self.incrementCount()
              self.countTransition = 0
              return false
            }
          }
      }
    }
  }
  
  func incrementCount() {
    self.count += 1
    self.highestLevelForThisCount = .notInAny
    self.countStartTime = nil
  }

  
    // MARK: - Methods to calculate initial information
  
  func firstStartExercise(_ pose: Pose, _ isFirstStartCallback: @escaping () -> Void) throws {
//    self.patientInformation = try getPatientInformation()
    isFirstStartCallback()
  }
    
}
