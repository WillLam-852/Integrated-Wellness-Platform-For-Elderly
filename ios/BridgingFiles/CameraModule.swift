//
//  CameraModule.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 13/4/2024.
//


@objc(CameraModule)
class CameraModule: NSObject {
    
    var reactVC: ReactViewController?

  
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
  

    @objc func start(_ exercises: NSString, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
      var exercisesList: [AbstractExercise] = []
      
      guard let jsonData = String(exercises).data(using: .utf8) else {
        print("[iOS CameraModule.selectExercises] ERROR: Failed to convert string to data")
        return
      }
      
      do {
        if let jsonArray = try JSONSerialization.jsonObject(with: jsonData) as? [[String: Any]] {
          for json in jsonArray {
            guard let exerciseId = json["exerciseId"] as? Int,
                  let planId = json["planId"] as? Int,
                  let target = json["target"] as? Int,
                  let disabilityFactor = json["disabilityFactor"] as? Double else {
              print("[iOS CameraModule.selectExercises] ERROR: exercises Format Incorrect")
              return
            }
            
            if exerciseId == 1 {
              exercisesList.append(Exercise1(Plan(id: planId, target: target, disabilityFactor: disabilityFactor)))
            } else if exerciseId == 2 {
              exercisesList.append(Exercise2(Plan(id: planId, target: target, disabilityFactor: disabilityFactor)))
            } else if exerciseId == 3 {
              exercisesList.append(Exercise3(Plan(id: planId, target: target, disabilityFactor: disabilityFactor)))
            }
          }
        }
      } catch {
        fatalError("[iOS CameraModule.selectExercises] Error parsing JSON: \(error)")
      }
      
      print("exercisesList:", exercisesList)

      DispatchQueue.main.async {
            // get currently presented view controller
            let keyWindow = UIApplication.shared.windows.filter {$0.isKeyWindow}.first
            if var topController = keyWindow?.rootViewController {
                while let presentedViewController = topController.presentedViewController {
                    topController = presentedViewController
                }
                
                // present new view controller
                if let reactVC = topController as? ReactViewController {
                    reactVC.showCameraView(exercisesList)
                    reactVC.camCallback = (resolve, reject)
                    self.reactVC = reactVC
                } else {
                    print("[iOS TherapyScreenModule.start] ERROR: ReactViewController not found")
                }
            }
        }
    }

}
