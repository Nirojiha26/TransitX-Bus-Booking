const BASE_URL = 'https://api.transitx.example.com';

export const apiClient = async (endpoint: string, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
