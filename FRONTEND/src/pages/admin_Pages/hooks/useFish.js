import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../service/apiRequest';


const useFish = () => {
    const [fishes, setFishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFishes = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/admin/listAllFish');
            setFishes(response.data);
            setError(null);
        } catch (err) {
            setError('Có lỗi xảy ra khi tải dữ liệu cá');
        } finally {
            setLoading(false);
        }
    };

    

    useEffect(() => {
        fetchFishes();
    }, []);


    const updateFish = async (fishData) => {
        try {
          const response = await axiosInstance.put('/admin/editInfoFish', fishData);
          return response.data;
        } catch (error) {
          console.error('Lỗi khi cập nhật thông tin cá:', error);
          throw error;
        }
      };


    return {
        fishes,
        loading,
        error,
        fetchFishes,
        updateFish
    };
};

export default useFish;
