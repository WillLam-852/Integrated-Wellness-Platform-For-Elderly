//
//  LaunchViewController.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 13/4/2024.
//

import UIKit
import React

class LaunchViewController: UIViewController {

    // MARK: Dev React Server
    /// current react native location with IP address of computer
    let jsCodeLocation = URL(string: K.Home)!

    /// local react native location in the device
    let bundleLocation = Bundle.main.url(forResource: "main", withExtension: "jsbundle")

    var urlTask: URLSessionDataTask?
    let activitiyIndicator = UIActivityIndicatorView(style: .large)
    

    // MARK: - ViewController Lifecycle

    override func viewDidLoad() {
#if DEBUG
        print("Running in DEBUG Mode")
#else
        print("Running in RELEASE Mode")
#endif
        print("Mobile API Address:", K.apiBaseUrl)
        super.viewDidLoad()
        self.activitiyIndicator.center = self.view.center
        self.activitiyIndicator.startAnimating()
        self.view.addSubview(activitiyIndicator)
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
#if DEBUG
        self.loadReactWithURL()
#else
        self.loadReactWithLocal()
#endif
    }

    func loadReactWithURL() {
        self.checkValidURL(jsCodeLocation) { isURLValid in
            if isURLValid {
                if let urlTask = self.urlTask {
                    // After checking the URL is valid, cancel the URL Session Task
                    urlTask.cancel()
                }
                self.beginReact()
            }
        }
    }

    /// Check connection to URL before loading view
    func checkValidURL(_ url: URL, completion: @escaping (Bool) -> Void) {
        let request = URLRequest(url: url)
        let session = URLSession(configuration: .default)
        urlTask = session.dataTask(with: request) { (data, response, error) in
            if let error = error {
                self.showErrorAlert(error)
            }
            if let _ = response as? HTTPURLResponse, error == nil {
                completion(true)
            } else {
                completion(false)
            }
        }
        self.urlTask?.resume()
    }

    func loadReactWithLocal() {
        self.beginReact(isLocal: true)
    }

    func beginReact(isLocal: Bool = false) {
        DispatchQueue.main.async {
            let reactVC = ReactViewController()
            reactVC.jsCodeLocation = isLocal ? self.bundleLocation : self.jsCodeLocation
            reactVC.modalPresentationStyle = .fullScreen
            self.present(reactVC, animated: false, completion: nil)
        }
    }

    func showErrorAlert(_ error: Error) {
        DispatchQueue.main.async {
            let alert = UIAlertController(title: NSLocalizedString(K.Localization.error, comment: "Error"), message: error.localizedDescription, preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: NSLocalizedString(K.Localization.tryAgain, comment: "Try Again"), style: .default) { _ in
                if let urlTask = self.urlTask {
                    if urlTask.state == .running {
                        urlTask.cancel()
                    }
                    self.loadReactWithURL()
                }
            })
            self.present(alert, animated: true, completion: nil)
        }
    }

}

