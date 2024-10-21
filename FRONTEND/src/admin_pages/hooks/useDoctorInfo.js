import { useState, useEffect } from 'react';
import { axiosInstance } from '../../services/apiRequest.js';


export const useDoctorInfo = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllDoctors = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/api/admin/listAllVeterinary');
            setDoctors(response.data);
            setLoading(false);
        } catch (err) {
            setError('Có lỗi xảy ra khi tải danh sách bác sĩ');
            setLoading(false);
        }
    };

    const deleteDoctor = async (id) => {
        try {
            await axiosInstance.delete(`/api/admin/deleteVeterinaryInfo?id=${id}`);
            await fetchAllDoctors(); // Cập nhật lại danh sách sau khi xóa
        } catch (err) {
            throw new Error('Có lỗi xảy ra khi xóa thông tin bác sĩ');
        }
    };

    const updateDoctorInfo = async (doctorData) => {
        try {
            const response = await axiosInstance.put('/api/admin/updateDoctorInfo', doctorData);
            await fetchAllDoctors(); // Cập nhật lại danh sách sau khi cập nhật
            return response.data;
        } catch (err) {
            throw new Error('Có lỗi xảy ra khi cập nhật thông tin bác sĩ');
        }
    };

    const getDoctorDetail = async (doctorId) => {
        try {
            const response = await axiosInstance.get(`/api/admin/getInfoDoctor/${doctorId}`);
            return response.data;
        } catch (err) {
            throw new Error('Có lỗi xảy ra khi lấy thông tin chi tiết bác sĩ');
        }
    };

    useEffect(() => {
        fetchAllDoctors();
    }, []);

    return {
        doctors,
        loading,
        error,
        fetchAllDoctors,
        deleteDoctor,
        updateDoctorInfo,
        getDoctorDetail
    };
};
