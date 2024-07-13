# Integrated Wellness Platform for Elderly

This repository contains a Integrated Wellness Platform for Elderly app that can be run on both Android and iOS devices. Follow the instructions below to get started.

## Prerequisites

To run this app, you need to have the following software installed on your machine:

-   Node.js
-   Yarn
-   React Native CLI
-   Xcode (for iOS)
-   Android Studio and Realted Packages (for Android)

## Installation

1. Navigate to the project directory using terminal
2. Install the required dependencies by running:
    ```
    yarn install
    ```

## Befor Running the Test
Before the test, in order to ensure the integrity of the test, please prepare a mobile phone equipped with a camera and ensure that the camera can connect to the internet. Otherwise, it will not be possible to test the posture recognition and related ChatGPT functionalities.

## Running on Android

1. Open Android Studio and open the project file. Choose the ``` android ``` directory under the root folder.
2. Connect your physical device to computer and make sure that the device has been enabled the "Developer Option" and "USB debugging"
3. Make sure that target device has been selected and click the Run 'app' button. (You should see the warming before you start the React Native Local Server)
4. Connecting your device to development server with adb command and install the react native module which mentioned at "Installation" section.
5. The app should run successfully at device

### Build Android Bundle
The react native side is not runnable if we don't build the Android Bundle. The app can run isolately after we create bundle between Android and React Native module.

1. Navigate to root project directory
2. Run the following command to build bundle:
```
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

### Build Android DEBUG version APK

1. Navigate to the Android project directory:
    ```
    cd android
    ```
2. Generate DEBUG apk:
    ```
    ./gradlew assembleDebug
    ```
3. Install APK to default device:
    ```
    adb install android/app/build/outputs/apk/debug/app-debug.apk
    ```
    Install APK to specific device:
    ```
    adb -s [device_serial_number] install path/to/your_app.apk
    ```

> Realted Link:

> 1. Run React Native on Device https://reactnative.dev/docs/running-on-device.html?platform=android
> 2. Generate Debug Android APK https://medium.com/@manasmahala53/how-to-generate-debug-and-release-apk-in-react-native-9901ffa79e3a

## Running on iOS

1. Navigate to the iOS project directory:
    ```
    cd ios
    ```
2. Install the required native dependencies by running:
    ```
    pod install
    ```
3. Open Xcode.
4. In Xcode, navigate to the project directory and open the `ios/BoilerReactNativeApplication.xcworkspace` file.
5. In Xcode, go to the project settings and select the target.
6. Change the bundle identifier to a unique identifier for the app.
5. Connect your iOS device to your machine.
6. Ensure that your iOS device is in [developer mode](https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device) by following the necessary steps.
8. In Xcode, select your connected device as the build target.
9. Select "Release" mode instead of "Debug" mode in the scheme.
10. Click the "Run" button or use the shortcut `Cmd+R` to build and run the app on your device.

This will build the app and deploy it to the iOS device.

> Note: Since the app requires camera functionality, it cannot be tested on the iOS simulator. Make sure you have a real iOS device connected for testing.

## Sign in to the Platform

The username and password for testing are as following:
- Username: `admin`
- Password: `admin`

## Troubleshooting

If you encounter any issues during the installation or running of the app, make sure you have followed all the prerequisites and steps correctly. You can also refer to the official React Native documentation for [troubleshooting tips](https://reactnative.dev/docs/troubleshooting).
