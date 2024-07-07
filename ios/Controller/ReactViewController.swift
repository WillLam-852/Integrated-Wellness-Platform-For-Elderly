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
  
    
    func showCameraView(_ exercises: [AbstractExercise]) {
        let navVC = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: K.ViewControllerID.NavigationControllerID) as! UINavigationController
        let camVC = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: K.ViewControllerID.CameraViewControllerID) as! CameraViewController
        navVC.setViewControllers([camVC], animated: false)
        navVC.modalPresentationStyle = .fullScreen
        camVC.exercises = exercises
        self.present(navVC, animated: true, completion: nil)
    }
    
    
}
