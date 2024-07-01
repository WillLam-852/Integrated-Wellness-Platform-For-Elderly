//
//  Plan.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 21/4/2024.
//

struct Plan {
    /// Primary key of this plan
  var id: Int
    /// Target number of count of this planned exercise
  var target: Int
    /// Disability Factor of this planned therapy [0.0-1.0]
  var disabilityFactor: Double?
}

extension Plan: Equatable {
  static func == (lhs: Plan, rhs: Plan) -> Bool {
    return lhs.id == rhs.id
  }
}
