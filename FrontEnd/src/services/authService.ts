import apiClient from './apiClient';

export const authService = {
  register: async (username: string, phone: string, email: string, role: string) => {
    console.log(' [AuthService] Calling /register:', { username, phone, email, role });
    
    try {
      const response = await apiClient.post('/register', {
        username,
        phone,
        email,
        role,
      });
      console.log(' [AuthService] Register Success:', response.data);
      return response.data;
    } catch (error: any) {
      const errorPayload = error.response?.data || error.message;
      console.error(' [AuthService] Register Error:', errorPayload);
      throw errorPayload;
    }
  },

  sendOtp: async (phone: string) => {
    console.log(' [AuthService] Calling /send-otp for:', phone);
    
    try {
      const response = await apiClient.post('/send-otp', { phone });
      console.log(' [AuthService] OTP Sent Successfully:', response.data);
      return response.data;
    } catch (error: any) {
      const errorPayload = error.response?.data || error.message;
      console.error(' [AuthService] Send-OTP Error:', errorPayload);
      throw errorPayload;
    }
  },

  verifyOtp: async (phone: string, code: string) => {
    console.log(' [AuthService] Calling /verify for:', phone, 'with code:', code);
    
    try {
      const response = await apiClient.post('/verify', { phone, code });
      console.log(' [AuthService] Verification Success:', response.data);
      return response.data;
    } catch (error: any) {
      const errorPayload = error.response?.data || error.message;
      console.error(' [AuthService] Verification Error:', errorPayload);
      throw errorPayload;
    }
  },

  saveBusDetails: async (busInfo: {
    busName: string;
    busNo: string;
    busType: string;
    seatType: string;
  }) => {
    console.log(' [AuthService] Saving Bus Details:', busInfo);
    try {
      // In a real app, this would be an API call like:
      // const response = await apiClient.post('/driver/bus-details', busInfo);
      // return response.data;
      
      // For now, we simulate a successful API call
      return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
    } catch (error: any) {
      const errorPayload = error.response?.data || error.message;
      console.error(' [AuthService] Save Bus Details Error:', errorPayload);
      throw errorPayload;
    }
  }
};