import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import MainButton from '../components/MainButton';
import { Colors } from '../constants/Colors';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const getRole = async () => {
      const savedRole = await AsyncStorage.getItem('userRole');
      console.log('🏠 [HomeScreen] Current User Role:', savedRole);
      setRole(savedRole);
    };
    getRole();
  }, []);

  const handleLogout = async () => {
    console.log('🚪 [HomeScreen] Logging out...');
    try {
      // Clear all auth data to fix the session vulnerability
      await Promise.all([
        AsyncStorage.removeItem('userToken'),
        AsyncStorage.removeItem('userRole'),
      ]);
      console.log(' [HomeScreen] Cache cleared, redirecting to Login');

      navigation.replace('Login');
    } catch (error) {
      console.error(' [HomeScreen] Logout Error:', error);
      Alert.alert('Error', 'Failed to log out correctly.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TransitX</Text>
        <Text style={styles.roleTag}>Logged in as: {role || 'Guest'}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subtitle}>Your smart bus booking solution</Text>

        {role === 'travel' ? (
          <MainButton
            title="Manage My Buses"
            onPress={() => console.log('Navigating to Fleet Management')}
          />
        ) : (
          <MainButton
            title="Book a Bus"
            onPress={() => console.log('Booking logic goes here')}
          />
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  roleTag: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    marginTop: 5,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  logoutButton: {
    marginBottom: 30,
    padding: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
