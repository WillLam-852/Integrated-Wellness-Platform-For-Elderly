# Integrated Wellness Platform for Elderly

This repository contains a React Native app that can be run on both Android and iOS devices. Follow the instructions below to get started.

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
3. Go back to the project root directory. In the project directory, run the following command to start the app on the iOS simulator:
    ```
    cd ..
    yarn ios
    ```

This will build the app and deploy it to the iOS simulator.

## Troubleshooting

If you encounter any issues during the installation or running of the app, make sure you have followed all the prerequisites and steps correctly. You can also refer to the official React Native documentation for troubleshooting tips.
