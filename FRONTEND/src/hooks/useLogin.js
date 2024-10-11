import { useState, useEffect } from 'react';
import { login } from '../services/apiLogin.js';
import {jwtDecode} from "jwt-decode";

export const useLogin = () => {
  const [username, setUsername] = useState(''); // Sử dụng username thay vì email
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Google login state (optional, depending on what data you need)
  const [googleUser, setGoogleUser] = useState(null);

  // Traditional login submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login();

      if (Array.isArray(data)) {
        const foundUser = data.find(
            (user) => user.username === username && user.password === password
        );

        if (foundUser) {
          console.log('Đăng nhập thành công:', foundUser);
          localStorage.setItem('authToken', 'fakeAuthToken123');
          window.location.href = '/homepage';
        } else {
          throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
        }
      } else {
        throw new Error('Dữ liệu người dùng không hợp lệ.');
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi đăng nhập:', error);
      setError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Google Login: Callback function to handle the response from Google login
  const handleCallbackResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setGoogleUser(userObject);
  };

  // Initialize Google Login when component mounts
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "1007903005549-31vue9ajdjrkgqftlavdov2h5v76kq33.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
        document.getElementById('signInDiv'), // Render Google Sign-In Button
        { theme: 'outline', size: 'large' }
    );

    // Optionally: Auto sign-in the user if they are already signed in
    google.accounts.id.prompt(); // Automatically shows the One Tap prompt
  }, []);

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    error,
    googleUser, // Optional: Google User object, in case you need to display user info
    handleSubmit, // Traditional login handler
    handleCallbackResponse // This can be exposed if needed for further control
  };
};
