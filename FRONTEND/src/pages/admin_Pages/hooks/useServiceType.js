import { useState } from 'react';
import { axiosInstance } from '../../../service/apiRequest';

export const useServiceType = () => {
    const [serviceTypes, setServiceTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchServiceTypes = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/listAllServiceType');
            setServiceTypes(response.data);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Đã xảy ra lỗi khi tải danh sách dịch vụ.');
            setLoading(false);
            console.error('Lỗi khi tải danh sách dịch vụ:', err);
        }
    };

    const deleteServiceType = async (id) => {
        try {
            await axiosInstance.delete(`/admin/deleteServiceType/${id}`);
            setServiceTypes(prevServices => 
                prevServices.map(service => 
                    service.id === id ? {...service, is_deleted: true} : service
                )
            );
        } catch (err) {
            setError('Đã xảy ra lỗi khi xóa dịch vụ.');
            console.error('Lỗi khi xóa dịch vụ:', err);
            throw err;
        }
    };

    const restoreServiceType = async (id) => {
        try {
            await axiosInstance.put(`/admin/restoreServiceType/${id}`);
            setServiceTypes(prevServices => 
                prevServices.map(service => 
                    service.id === id ? {...service, is_deleted: false} : service
                )
            );
        } catch (err) {
            setError('Đã xảy ra lỗi khi khôi phục dịch vụ.');
            console.error('Lỗi khi khôi phục dịch vụ:', err);
            throw err;
        }
    };

    const editServiceType = async (id, serviceData) => {
        try {
            const response = await axiosInstance.put(`/admin/editServiceType/${id}`, serviceData);
            if (response.status === 202) {
                setServiceTypes(prevServices =>
                    prevServices.map(service =>
                        service.id === id ? { ...service, ...serviceData } : service
                    )
                );
                return response.data;
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi cập nhật thông tin dịch vụ.');
            console.error('Lỗi khi cập nhật thông tin dịch vụ:', err);
            throw err;
        }
    };

    const addServiceType = async (newService) => {
        try {
            const response = await axiosInstance.post('/admin/addNewService', newService);
            setServiceTypes(prevServiceTypes => [...prevServiceTypes, response.data]);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi thêm mới dịch vụ:', error);
            if (error.response) {
                throw error.response;  // Trả về toàn bộ response error
            } else {
                throw new Error('Có lỗi xảy ra khi thêm mới dịch vụ. Vui lòng thử lại.');
            }
        }
    };
    

    return {
        serviceTypes,
        loading,
        error,
        fetchServiceTypes,
        deleteServiceType,
        restoreServiceType,
        setServiceTypes,
        addServiceType,
    };
};
