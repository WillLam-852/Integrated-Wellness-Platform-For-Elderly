//
//  ReactViewController.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 13/4/2024.
//

import React

struct ActivityResult: Encodable {
    let code: Int?
    let action: String?
    let activityName: String?
}

class ReactViewController: UIViewController {
    
    var jsCodeLocation: URL?
    var camCallback: (RCTPromiseResolveBlock, RCTPromiseRejectBlock)?
    
    
    // MARK: - ViewController Lifecycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let jsCodeLocation = jsCodeLocation {
            beginReact(jsCodeLocation)
        } else {
            print("ERROR: No jsCodeLocation")
        }
    }
    
    func beginReact(_ jsCodeLocation: URL) {
        let bridge = RCTBridge(bundleURL: jsCodeLocation, moduleProvider: nil, launchOptions: nil)!
        let rootView = RCTRootView(bridge: bridge, moduleName: "BoilerReactNativeApplication", initialProperties: nil)
        self.view = rootView
    }
  
    
    func showCameraView() {
        let navVC = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: K.ViewControllerID.NavigationControllerID) as! UINavigationController
        let camVC = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: K.ViewControllerID.CameraViewControllerID) as! CameraViewController
        navVC.setViewControllers([camVC], animated: false)
        navVC.modalPresentationStyle = .fullScreen
        self.present(navVC, animated: true, completion: nil)
    }
    
    
}


// MARK: - Extension

//extension ReactViewController: CameraViewDelegate {
//    func cameraViewCompleted(_ isCompleted: Bool) {
//        if let camCallback = camCallback {
//            let activityResult: ActivityResult?
//            if isCompleted {
//                // Leave camera view with result
//                activityResult = ActivityResult(code: -1, action: "actFinished", activityName: nil)
//            } else {
//                // Leave camera view with no result
//                activityResult = ActivityResult(code: -1, action: "close", activityName: nil)
//            }
//            print("activityResult", activityResult!)
//            do {
//                let data = try JSONEncoder().encode(activityResult!)
//                camCallback.0(String(data: data, encoding: .utf8))
//            } catch {
//                camCallback.1("FORMAT", error.localizedDescription, nil)
//            }
//        } else {
//            print("ERROR: No Camera Callback")
//        }
//    }
//}
