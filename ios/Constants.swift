//
//  Constants.swift
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 13/4/2024.
//

public enum K {
  
  // MARK: - React Server IP Address
  // SAIL-Wifi
  public static let SAILWIFI = "http://192.168.88.69:8081/index.bundle?platform=ios"
  // HKU WiFi
  public static let HKU = "http://10.69.120.111:8081/index.bundle?platform=ios"
  // Home WiFi
  public static let Home = "http://192.168.50.12:8081/index.bundle?platform=ios"

  // MARK: - APIs to server
//#if DEBUG
//    private static let protocal = "http"
//    private static let domain = "192.168.88.184:81"
//#else
//  private static let protocal = "https"
//  private static let domain = "app.remobility.net"
//#endif
//  private static let mobileAPI = "mobileapi/v2"
//  public static let apiBaseUrl = "\(protocal)://\(domain)/\(mobileAPI)";
  public static let apiBaseUrl = "Pending...";
  
  // MARK: - DispatchQueueLabel
  struct DispatchQueueLabel {
      public static let sessionQueue = "SessionQueue"
      public static let detectionQueue = "DetectionQueue"
  }
  
    // MARK: - ViewControllerID
  struct ViewControllerID {
    public static let LaunchViewControllerID = "LaunchViewControllerID"
    public static let ReactViewControllerID = "ReactViewControllerID"
    public static let NavigationControllerID = "NavigationControllerID"
    public static let CameraViewControllerID = "CameraViewControllerID"
  }
  

  struct Localization {
    public static let error = "error"
    public static let tryAgain = "tryAgain"
    public static let permissionRequest = "permissionRequest"
    public static let enablePermission = "enablePermission"
    public static let OK = "OK"
    public static let settings = "settings"
    public static let unableCaptureMedia = "unableCaptureMedia"
  }

}