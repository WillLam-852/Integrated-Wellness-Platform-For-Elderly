# Integrated Wellness Platform for Elderly

This repository contains a Integrated Wellness Platform for Elderly app that can be run on both Android and iOS devices. Follow the instructions below to get started.

## Prerequisites

To run this app, you need to have the following software installed on your machine:

-   Node.js
-   Yarn
-   React Native CLI
-   Xcode (for iOS)
-   Android Studio (for Android)

## Installation

1. Navigate to the project directory using terminal
2. Install the required dependencies by running:
    ```
    yarn install
    ```

## Running on Android

1. Open Android Studio and launch the Android Virtual Device (AVD) Manager.
2. Create a new virtual device if one doesn't exist already.
3. Start the virtual device.
4. In the project directory, run the following command to start the app on the Android emulator:
    ```
    yarn android
    ```

This will build the app and deploy it to the Android emulator

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
