# 🚌 TransitX - Bus Booking Application

TransitX is a modern React Native application designed for effortless, reliable, and comfortable bus bookings. This project features a premium UI/UX with a focus on responsiveness across all mobile devices.

### Quick Start Code Snippet
```javascript
// index.js - App Entry Point
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine for development.

### 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18.x or higher (v20+ recommended)
- **JDK**: JDK 17 (Required for Android)
- **Android Studio**: Configured with Android SDK and an Emulator
- **Xcode**: (macOS only) For iOS development
- **CocoaPods**: (macOS only) For iOS dependency management

---

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd TransitX-Bus-Booking/FrontEnd
   ```

2. **Install JavaScript dependencies:**
   ```bash
   npm install
   ```

---

## 📱 iOS and Android Setup

### Android Setup
1. Open Android Studio and load the `android` folder.
2. Let Gradle sync completely.
3. Ensure you have the correct SDK and JDK (Java 17) installed.
4. Add your `local.properties` file with `sdk.dir=/Users/<username>/Library/Android/sdk` (macOS).

### iOS Setup (macOS only)
1. Navigate to the `ios` directory:
   ```bash
   cd ios
   ```
2. Install Ruby dependencies:
   ```bash
   bundle install
   ```
3. Install CocoaPods:
   ```bash
   pod install
   cd ..
   ```
4. Open the `.xcworkspace` file in Xcode and configure your signing certificate.

---

## 🔥 Firebase Setup

To enable push notifications, analytics, and app distribution, you must set up Firebase:

1. **Android:**
   - Download the `google-services.json` file from your Firebase Console.
   - Place it inside the `android/app/` directory.

2. **iOS:**
   - Download the `GoogleService-Info.plist` file from your Firebase Console.
   - Add it to your project via Xcode by dragging it into the `ios/` folder.

---

## 🐞 Pluto Setup for Debugging

Pluto is an on-device debugging framework used in this project to monitor network requests, logs, and shared preferences.

**How to Run and Use Pluto:**
1. Ensure you are running a `debug` build (Pluto is disabled in `release` builds).
2. Start the app. A floating Pluto icon should appear on the screen, or you may need to shake the device.
3. Click the icon to view network requests, crashes, and app preferences.

**Configuration Check:**
Ensure your `android/app/build.gradle` has Pluto configured properly for debug:
```gradle
debugImplementation 'com.plutolib:pluto:2.2.0'
debugImplementation 'com.plutolib.plugins:network:2.2.0'
```

---

## 🏃 How to Run

### 1. Start the Metro Bundler
First, start the development server in a dedicated terminal:
```bash
npx react-native start
```

### 2. Run on Android
Ensure an emulator is running or a physical device is connected via USB:
```bash
npx react-native run-android
```

### 3. Run on iOS (macOS only)
```bash
npx react-native run-ios
```

---

## 💡 Troubleshooting

- **Port 8081 already in use:**
  If you see `EADDRINUSE`, kill the process using port 8081:
  ```bash
  kill -9 $(lsof -t -i:8081)
  ```

- **Android Build Fails:**
  Ensure your `android/local.properties` points to the correct Android SDK path and that your JDK version is 17.

- **Clear App Cache (ADB):**
  To reset the app state:
  ```bash
  adb shell pm clear com.frontend
  ```

---

## 🎨 Technology Stack
- **Framework**: React Native (0.84+)
- **Navigation**: React Navigation
- **State Management**: React Hooks & AsyncStorage
- **Icons**: MaterialIcons (Vector Icons)
- **Styling**: Premium Custom CSS with Responsive Scaling

---

## 📱 Developer Notes
- The app uses a custom responsive utility located in `src/utils/responsive.ts` to handle various screen sizes.
- Authentication flow is handled via `authService.ts`.