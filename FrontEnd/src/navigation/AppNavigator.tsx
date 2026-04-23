import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen'; 
import LoginScreen from '../screens/LoginScreen'; 
import VerifyOTPScreen from '../screens/VerifyOTPScreen'; 
import BusDetailsScreen from '../screens/BusDetailsScreen';
import ClassifyBusScreen from '../screens/ClassifyBusScreen';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  VerifyOTP: { phone: string };
  BusDetails: undefined;
  ClassifyBus: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  

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
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />

      {/* Main App Screens */}
      <Stack.Screen name="BusDetails" component={BusDetailsScreen} />
      <Stack.Screen name="ClassifyBus" component={ClassifyBusScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;