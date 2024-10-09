import axios from 'axios';

export const register = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/register');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error)
  }
};
