import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// The 'Home Address' of your buddy's backend
const BASE_URL = 'https://travel-backend-api-t25i.onrender.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 45000, // 45 seconds to handle Render's cold starts
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// We will add the 401 Interceptor here in the next sub-task 
// to handle the "Token Expired" vulnerability you mentioned.

export default apiClient;
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired!
      await AsyncStorage.removeItem('userToken');
      // You can trigger a navigation reset to Login here 
      // or use an event listener in your AppNavigator.
    }
    return Promise.reject(error);
  }
);