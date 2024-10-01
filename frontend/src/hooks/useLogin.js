import { useState } from 'react';
import { login } from '../services/apiLogin'; 
import { auth, provider, signInWithPopup } from "../services/firebase-config"; 

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    try {
      const response = await login(email, password); 
      console.log('Đăng nhập thành công:', response);
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.error('Đã xảy ra lỗi.');
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false); 
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Đăng nhập Google thành công:', result.user);
    } catch (error) {
      console.error('Lỗi đăng nhập Google:', error);
      setError('Đăng nhập Google thất bại.');
    } finally {
      setLoading(false); 
    }
  };

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
    handleGoogleLogin
  };
};
