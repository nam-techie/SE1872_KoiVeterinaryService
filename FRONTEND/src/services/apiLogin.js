import axios from 'axios';

export const login = async () => {
  try {
    // const response = await axios.post('http://localhost:8080/api/login');
    const response = await axios.get('/users.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error)
  }
};
