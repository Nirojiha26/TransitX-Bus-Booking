import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const moveAnim = useRef(new Animated.Value(-width)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // 1. Start Animations
    // Drive across the screen
    Animated.loop(
      Animated.timing(moveAnim, {
        toValue: width,
        duration: 3500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Subtle bounce to simulate road bumps
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        })
      ])
    ).start();

    // 2. Logic to decide which screen to show
    const checkUserStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');

        // Allow animation to run for 3.5 seconds before navigating
        setTimeout(() => {
          if (userToken) {
            // Case 1: Session exists
            navigation.replace('Home');
          } else if (hasLaunched === null) {
            // Case 2: First time ever opening the app
            AsyncStorage.setItem('hasLaunched', 'true');
            navigation.replace('Register');
          } else {
            // Case 3: App was downloaded before, but user is logged out
            navigation.replace('Login');
          }
        }, 3500);
      } catch (error) {
        console.error("Auth check failed", error);
        navigation.replace('Register');
      }
    };

    checkUserStatus();
  }, [moveAnim, bounceAnim, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TransitX</Text>
      
      <Animated.View style={{
        transform: [
          { translateX: moveAnim },
          { translateY: bounceAnim }
        ],
        marginTop: 40,
        width: '100%',
        alignItems: 'center'
      }}>
        <BusIcon />
      </Animated.View>
    </View>
  );
};

// Reusable Bus Component
const BusIcon = () => (
  <View style={{ width: 80, height: 50, alignItems: 'center' }}>
    <View style={{
      width: 70, height: 35, backgroundColor: 'black', 
      borderTopLeftRadius: 10, borderTopRightRadius: 10, 
      borderBottomLeftRadius: 3, borderBottomRightRadius: 3,
      paddingTop: 6, paddingHorizontal: 6,
      flexDirection: 'row', justifyContent: 'space-between'
    }}>
      <View style={{ width: 14, height: 12, backgroundColor: 'white', borderRadius: 2 }} />
      <View style={{ width: 14, height: 12, backgroundColor: 'white', borderRadius: 2 }} />
      <View style={{ width: 14, height: 12, backgroundColor: 'white', borderRadius: 2 }} />
    </View>
    <View style={{
      width: 50, flexDirection: 'row', justifyContent: 'space-between',
      position: 'absolute', bottom: 7
    }}>
      <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: 'black', borderWidth: 1.5, borderColor: 'white' }} />
      <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: 'black', borderWidth: 1.5, borderColor: 'white' }} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6F00',
    letterSpacing: 1,
  },
});

export default SplashScreen;