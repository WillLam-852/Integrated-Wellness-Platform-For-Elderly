//
//  Exercise3.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 29/4/2024.
//

class Exercise3: AbstractExercise {
  
  override init(_ plan: Plan) {
    super.init(plan)
    self.code = .E3
    self.side = .both
    self.name = "原地踏步 + 雙手向上搖擺"
    self.criteriaSets = [
      [
        Criteria(
          angles: KeyPointAngle(from: PoseKeyPoint(.wrist, .left),
                                center: PoseKeyPoint(.elbow, .left),
                                to: PoseKeyPoint(.shoulder, .left),
                                axes: [.Y]),
          side: .left,
          weight: 0.15,
          feedbacks: [
            Feedback(resultValueRange: (0.05, 0.0), scoreRange: (75.0, 100.0), level: .level1, comment: "Well done!"),
            Feedback(resultValueRange: (0.10, 0.05), scoreRange: (50.0, 75.0), level: .level2, comment: "Arm is a bit low"),
            Feedback(resultValueRange: (0.15, 0.10), scoreRange: (0.0, 50.0), level: .level3, comment: "Arm is too low")
          ],
          isForCounting: true
        ),
        Criteria(
          angles: KeyPointAngle(from: PoseKeyPoint(.wrist, .right),
                                center: PoseKeyPoint(.elbow, .right),
                                to: PoseKeyPoint(.shoulder, .right),
                                axes: [.Y]),
          side: .right,
          weight: 0.15,
          feedbacks: [
            Feedback(resultValueRange: (0.12, 0.10), scoreRange: (75.0, 100.0), level: .level1, comment: "Well done!"),
            Feedback(resultValueRange: (0.14, 0.12), scoreRange: (50.0, 75.0), level: .level2, comment: "Arm is a bit low"),
            Feedback(resultValueRange: (0.16, 0.14), scoreRange: (0.0, 50.0), level: .level3, comment: "Arm is too low")
          ]
        ),
        Criteria(
          angles: KeyPointAngle(from: PoseKeyPoint(.wrist, .left),
                                center: PoseKeyPoint(.elbow, .left),
                                to: PoseKeyPoint(.shoulder, .left),
                                axes: [.X]),
          side: .left,
          weight: 0.35,
          feedbacks: [
            Feedback(resultValueRange: (-0.35, -0.4), scoreRange: (75.0, 100.0), level: .level1, comment: "Well done!"),
            Feedback(resultValueRange: (-0.3, -0.35), scoreRange: (50.0, 75.0), level: .level2, comment: "Arm is a bit low"),
            Feedback(resultValueRange: (-0.2, -0.3), scoreRange: (0.0, 50.0), level: .level3, comment: "Arm is too low")
          ]
        ),
        Criteria(
          angles: KeyPointAngle(from: PoseKeyPoint(.wrist, .right),
                                center: PoseKeyPoint(.elbow, .right),
                                to: PoseKeyPoint(.shoulder, .right),
                                axes: [.X]),
          side: .right,
          weight: 0.35,
          feedbacks: [
            Feedback(resultValueRange: (-0.17, -0.2), scoreRange: (75.0, 100.0), level: .level1, comment: "Well done!"),
            Feedback(resultValueRange: (-0.14, -0.17), scoreRange: (50.0, 75.0), level: .level2, comment: "Arm is a bit low"),
            Feedback(resultValueRange: (-0.1, -0.14), scoreRange: (0.0, 50.0), level: .level3, comment: "Arm is too low")
          ]
        )
      ]
    ]
  }
  
  
  override func calculateResultValue(pose: Pose, criteria: Criteria, calculationExtraInformation: CalculationExtraInformation) throws -> Double {
    let keyPointAngle = criteria.angles!
    let fromPoint = pose.getKeyPoint(keyPointAngle.from as! PoseKeyPoint).point!
    let toPoint = pose.getKeyPoint(keyPointAngle.to as! PoseKeyPoint).point!
    let axes = keyPointAngle.axes
    let resultValue = Point3D.calculate3DSignedDistance(from: fromPoint, to: toPoint, signedAxis: axes[0], fromAxes: axes)
    return resultValue
  }
  
}
