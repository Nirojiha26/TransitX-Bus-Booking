import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Update to use the latest IP/URL provided
const BASE_URL = 'http://34.100.210.108'; 

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // ⬆️ Increased to 60s to handle Render/Server lag
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[Pluto] Outgoing ${config.method?.toUpperCase()} to ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`[Pluto] Response ${response.status} from ${response.config.url}`);
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error('[Pluto] 401 Unauthorized - Clearing Session');
      await AsyncStorage.removeItem('userToken');
    }
    return Promise.reject(error);
  }
);

export default apiClient;