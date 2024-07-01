//
//  Exercise2.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 28/4/2024.
//

class Exercise2: AbstractExercise {
  
  private var firstShoulderDistance: Double? = nil
  
  override init(_ plan: Plan) {
    super.init(plan)
    self.code = .E2
    self.side = .both
    self.name = "軀幹轉動"
  }
  
  
  override func firstStartExercise(_ pose: Pose, _ isFirstStartCallback: @escaping () -> Void) throws {
    self.firstShoulderDistance = self.calculateShoulderDistance(pose)
    self.criteriaSets = [
      [
        Criteria(
          angles: nil,
          side: .both,
          weight: 1.0,
          feedbacks: [
            Feedback(resultValueRange: (self.firstShoulderDistance! * 0.4, self.firstShoulderDistance! * 0.3), scoreRange: (75.0, 100.0), level: .level1, comment: "Well done!"),
            Feedback(resultValueRange: (self.firstShoulderDistance! * 0.6, self.firstShoulderDistance! * 0.4), scoreRange: (50.0, 75.0), level: .level2, comment: "Arm is a bit low"),
            Feedback(resultValueRange: (self.firstShoulderDistance! * 0.8, self.firstShoulderDistance! * 0.6), scoreRange: (0.0, 50.0), level: .level3, comment: "Arm is too low")
          ],
          isForCounting: true
        )
      ]
    ]
    try super.firstStartExercise(pose, isFirstStartCallback)
  }
  
  
  override func calculateResultValue(pose: Pose, criteria: Criteria, calculationExtraInformation: CalculationExtraInformation) throws -> Double {
    let shoulderDistance = self.calculateShoulderDistance(pose)
    return shoulderDistance
  }
  
  
  private func calculateShoulderDistance(_ pose: Pose) -> Double {
    let leftShoulderPoint = pose.getKeyPoint(PoseKeyPoint(.shoulder, .left)).point!
    let rightShoulderPoint = pose.getKeyPoint(PoseKeyPoint(.shoulder, .right)).point!
    let distance = Point3D.calculate3DDistance(leftShoulderPoint, rightShoulderPoint, [.X])
    return distance
  }

}
