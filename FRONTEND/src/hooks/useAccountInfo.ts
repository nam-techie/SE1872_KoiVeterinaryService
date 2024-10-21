import { useState, useEffect } from 'react';
import axios from 'axios';

interface AccountInfo {
  username: string;
  email: string;
  role: string;
}

export const useAccountInfo = (email: string) => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/admin/getInfoAccount/${email}`);
        setAccountInfo(response.data);
        setError(null);
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy thông tin tài khoản');
        console.error('Lỗi khi lấy thông tin tài khoản:', err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchAccountInfo();
    }
  }, [email]);

  return { accountInfo, loading, error };
};
