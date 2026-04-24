# TransitX - Bus Booking Application
TransitX is a professional React Native application providing a streamlined interface for bus reservations. The project emphasizes a high-performance architecture and a fully responsive UI/UX across diverse mobile platforms.

## Installation and Environment Setup

### Core Installation
Initialize the project by installing the necessary Node modules from the root directory.

```bash
npm install
```

### Android Platform Configuration
Initialize Android Studio and import the `android` directory.

Complete the Gradle synchronization process.

Verify the installation of JDK 17 and the appropriate Android SDK versions.

Configure the `local.properties` file with the correct SDK path.

```bash
cd android && ./gradlew clean
```

### iOS Platform Configuration
Navigate to the iOS directory and install dependencies.

Link the native modules using CocoaPods.

```bash
cd ios && bundle install && pod install && cd ..
```

## Infrastructure Services

### Firebase Integration
Firebase is utilized for analytics, push notifications, and distribution management.

- **Android:** Place `google-services.json` in `android/app/`.
- **iOS:** Integrate `GoogleService-Info.plist` via Xcode.

### Network and Debugging (Pluto)
The application integrates the Pluto framework for real-time on-device debugging. This tool monitors network traffic, system logs, and persistent storage during the development cycle.

- Access the interface via the persistent notification or the device shake gesture.
- Used to verify API status codes and payload integrity.

## Operational Procedures

### 1. Start the Metro Bundler
The bundler must be running to serve the JavaScript code to the device.

```bash
npx react-native start
```

### 2. Launch on Android
Ensure an emulator is running or a physical device is connected.

```bash
npx react-native run-android
```

### 3. Launch on iOS
Requires a macOS environment with Xcode installed.

```bash
npx react-native run-ios
```

### 4. Application State Reset
To clear all cached data, user tokens, and reset the app to the Splash screen without uninstalling.

```bash
adb shell pm clear com.frontend
```

## Architecture and Development Standards

### Responsive Design
The project implements a centralized responsive utility to calculate dynamic scaling for typography and layout components based on device dimensions.

### Authentication and Data Flow
The authentication lifecycle and token persistence are managed through a dedicated service layer. This layer handles registration, OTP verification, and session caching using asynchronous storage.

### Networking
All external communication is routed through a centralized API client configured with request and response interceptors. These interceptors manage authorization headers and global error handling for status codes such as 401 Unauthorized.