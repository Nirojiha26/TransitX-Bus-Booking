import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen'; 
import LoginScreen from '../screens/LoginScreen'; 
import VerifyOTPScreen from '../screens/VerifyOTPScreen'; 
export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  VerifyOTP: { phone: string };
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  // Logic Tip: Later, we will use your 'useAuth' hook here 
  // to decide if we show the Auth screens or the Home screen.

  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      
      {/* Auth Screens */}
      <Stack.Screen name="Register" component={RegisterScreen} />
      { <Stack.Screen name="Login" component={LoginScreen} /> }
      { <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} /> }

      {/* Main App Screens */}
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;