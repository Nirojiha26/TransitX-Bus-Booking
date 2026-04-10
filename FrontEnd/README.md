# 🚌 TransitX - Bus Booking Application

TransitX is a modern React Native application designed for effortless, reliable, and comfortable bus bookings. This project features a premium UI/UX with a focus on responsiveness across all mobile devices.

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

3. **Install iOS dependencies (macOS only):**
   ```bash
   cd ios
   bundle install # If you have a Gemfile
   pod install
   cd ..
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
  To reset the app state (Splash/Welcome screens):
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