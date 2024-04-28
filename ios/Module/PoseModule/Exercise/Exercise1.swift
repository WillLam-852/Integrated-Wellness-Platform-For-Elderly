//
//  Exercise1.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 24/4/2024.
//

class Exercise1: AbstractExercise {
    
  override init(_ plan: Plan) {
    super.init(plan)
    self.code = .E1
    self.side = .both
    self.name = "Exercise 1"
    self.isCountStateStarted = true
    self.criteriaSets = [
      [
        Criteria(
          angles: KeyPointAngle(from: PoseKeyPoint(.elbow, .left),
                                center: PoseKeyPoint(.shoulder, .left),
                                to: PoseKeyPoint(.hip, .left)),
          side: .left,
          weight: 1.0,
          feedbacks: [
            Feedback(resultValueRange: (150.0-K.Exercise.ShoulderAngleMinimum, 170.0-K.Exercise.ShoulderAngleMinimum), scoreRange: (75.0, 100.0), level: .level1, comment: "Well done!"),
            Feedback(resultValueRange: (90.0-K.Exercise.ShoulderAngleMinimum, 150.0-K.Exercise.ShoulderAngleMinimum), scoreRange: (50.0, 75.0), level: .level2, comment: "Arm is a bit low"),
            Feedback(resultValueRange: (45.0-K.Exercise.ShoulderAngleMinimum, 90.0-K.Exercise.ShoulderAngleMinimum), scoreRange: (0.0, 50.0), level: .level3, comment: "Arm is too low")
          ],
          isForCounting: true
        ),
        Criteria(
          angles: KeyPointAngle(from: PoseKeyPoint(.elbow, .right),
                                center: PoseKeyPoint(.shoulder, .right),
                                to: PoseKeyPoint(.hip, .right)),
          side: .right,
          weight: 0.5,
          feedbacks: [
            Feedback(resultValueRange: (150.0-K.Exercise.ShoulderAngleMinimum, 170.0-K.Exercise.ShoulderAngleMinimum), scoreRange: (75.0, 100.0), level: .level1, comment: "Well done!"),
            Feedback(resultValueRange: (90.0-K.Exercise.ShoulderAngleMinimum, 150.0-K.Exercise.ShoulderAngleMinimum), scoreRange: (50.0, 75.0), level: .level2, comment: "Arm is a bit low"),
            Feedback(resultValueRange: (45.0-K.Exercise.ShoulderAngleMinimum, 90.0-K.Exercise.ShoulderAngleMinimum), scoreRange: (0.0, 50.0), level: .level3, comment: "Arm is too low"),
          ],
          isForSecondary: true
        )
      ]
    ]
  }
  
}
