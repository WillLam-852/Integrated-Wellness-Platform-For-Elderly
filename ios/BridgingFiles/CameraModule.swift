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
    
    @objc func start(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            // get currently presented view controller
            let keyWindow = UIApplication.shared.windows.filter {$0.isKeyWindow}.first
            if var topController = keyWindow?.rootViewController {
                while let presentedViewController = topController.presentedViewController {
                    topController = presentedViewController
                }
                
                // present new view controller
                if let reactVC = topController as? ReactViewController {
                    reactVC.showCameraView()
                    reactVC.camCallback = (resolve, reject)
                    self.reactVC = reactVC
                } else {
                    print("[iOS TherapyScreenModule.start] ERROR: ReactViewController not found")
                }
            }
        }
    }

}
