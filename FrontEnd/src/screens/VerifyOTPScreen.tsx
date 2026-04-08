import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../services/apiClient';
import { Colors } from '../constants/Colors';

const VerifyOTPScreen = ({ route, navigation }: any) => {
  const { phone } = route.params; // Get phone number from previous screen
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (code.length < 4) {
      return Alert.alert('Invalid Code', 'Please enter the full verification code.');
    }

    setLoading(true);
    try {
      // 1. Call the Verify Endpoint
      const response = await apiClient.post('/verify', {
        phone: phone,
        code: code
      });

      // 2. Extract the Token (Bearer Token)
      const { token } = response.data;

      if (token) {
        // 3. STORE THE TOKEN IN CACHE
        await AsyncStorage.setItem('userToken', token);
        
        Alert.alert('Success', 'Logged in successfully!');
        
        // 4. Move to Home Screen
        navigation.replace('Home'); 
      }
    } catch (error: any) {
      Alert.alert('Verification Failed', error.response?.data?.message || 'Invalid code. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>
        We have sent the code to {'\n'}
        <Text style={{ fontWeight: 'bold' }}>{phone}</Text>
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.otpInput}
          placeholder="00000"
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
           
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleVerify}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Submit</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.resendText}>Didn't receive the code? <Text style={{color: Colors.primary}}>Resend</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
    lineHeight: 22,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  otpInput: {
    height: 60,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
      fontWeight: 'bold',
    letterSpacing: 10,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#E4643B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendText: {
    color: '#666',
  }
});

export default VerifyOTPScreen;