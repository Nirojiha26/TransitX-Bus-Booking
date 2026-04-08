import apiClient from './apiClient';

export const authService = {
  // Register: curl --location '.../register'
  register: async (username: string, phone: string, email: string, role: string) => {
    try {
      const response = await apiClient.post('/register', {
        username,
        phone,
        email,
        role,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || 'Registration failed';
    }
  },

  // Send OTP: curl --location '.../send-otp'
  sendOtp: async (phone: string) => {
    try {
      const response = await apiClient.post('/send-otp', { phone });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || 'Failed to send OTP';
    }
  },
};