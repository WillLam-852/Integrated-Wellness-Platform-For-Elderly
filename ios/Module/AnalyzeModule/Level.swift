//
//  Level.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 21/4/2024.
//

enum Level: String {
  case notInAny = "notInAny"
    // Poor
  case level3 = "level3"
    // Good
  case level2 = "level2"
    // Perfect
  case level1 = "level1"
}

extension Level: Comparable {
  static func < (lhs: Level, rhs: Level) -> Bool {
    switch (lhs, rhs) {
      case (.notInAny, .level3):
        return true
      case (.notInAny, .level2):
        return true
      case (.notInAny, .level1):
        return true
      case (.level3, .level2):
        return true
      case (.level3, .level1):
        return true
      case (.level2, .level1):
        return true
      default:
        return false
    }
  }
}
