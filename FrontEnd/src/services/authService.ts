import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  register: async (
    username: string, 
    phone: string, 
    email: string, 
    role: string,
    busName?: string,
    busNo?: string,
    busType?: string,
    seatType?: string
  ) => {
    if (!username || username.trim().length < 3) throw new Error("Username must be at least 3 characters");
    if (!/^\d{9,10}$/.test(phone)) throw new Error("Phone must be a valid 9 or 10 digit number");
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Invalid email format");
    if (!['passenger', 'driver'].includes(role)) throw new Error("Please select a valid role");

    console.log('[AuthService] Calling /register:', { username, phone, email, role, busName, busNo, busType, seatType });
    
    try {
      const response = await apiClient.post('/register', {
        username,
        phone,
        email,
        role,
        bus_name: busName || null,
        bus_numbers: busNo || null,
        bus_type: busType || null,
        seat_type: seatType || null,
      });
      console.log('[AuthService] Register Success:', response.data);
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || "Registration failed";
      console.error('[AuthService] Register Error:', errorMsg);
      throw new Error(errorMsg);
    }
  },

  sendOtp: async (phone: string) => {
    if (!/^\d{9,10}$/.test(phone)) throw new Error("Invalid phone number format");

    console.log('[AuthService] Calling /send-otp for:', phone);
    
    try {
      const response = await apiClient.post('/send-otp', { phone });
      console.log('[AuthService] OTP Sent Successfully:', response.data);
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to send OTP";
      console.error('[AuthService] Send-OTP Error:', errorMsg);
      throw new Error(errorMsg);
    }
  },

  verifyOtp: async (phone: string, code: string) => {
    if (!code || code.length < 4) throw new Error("OTP code is too short");

    console.log('[AuthService] Calling /verify for:', phone, 'with code:', code);
    
    try {
      const response = await apiClient.post('/verify', { phone, code });
      
      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        console.log('[AuthService] Token cached successfully');
      }

      console.log('[AuthService] Verification Success:', response.data);
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || "Verification failed";
      console.error('[AuthService] Verification Error:', errorMsg);
      throw new Error(errorMsg);
    }
  },

  logout: async () => {
    console.log('[AuthService] Calling /logout');
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('[AuthService] No token found, skipping backend logout');
        await AsyncStorage.removeItem('userToken');
        return { success: true, message: 'Locally logged out' };
      }

      const response = await apiClient.post('/logout');
      await AsyncStorage.removeItem('userToken');
      console.log('[AuthService] Logout Success:', response.data);
      return response.data;
    } catch (error: any) {
      const errorPayload = error.response?.data || error.message;
      await AsyncStorage.removeItem('userToken'); 
      
      if (errorPayload?.message?.includes('bearer token')) {
        console.warn('[AuthService] Backend rejected logout (invalid/missing token), but local session is cleared.');
        return { success: true, message: 'Local session cleared' };
      }

      console.error('[AuthService] Logout Error:', errorPayload);
      throw errorPayload;
    }
  },

  saveBusDetails: async (busInfo: {
    busName: string;
    busNo: string;
    busType: string;
    seatType: string;
  }) => {
    console.log('[AuthService] Saving Bus Details:', busInfo);
    try {
      const payload = {
        ...busInfo,
        travels_name: null,
        travels_number: null,
        BusesNumbers: [],
      };
      console.log('[AuthService] Sending Payload:', payload);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('[AuthService] Bus Details Saved (Simulated)');
          resolve({ success: true });
        }, 1000);
      });
    } catch (error: any) {
      const errorPayload = error.response?.data || error.message;
      console.error('[AuthService] Save Bus Details Error:', errorPayload);
      throw errorPayload;
    }
  }
};