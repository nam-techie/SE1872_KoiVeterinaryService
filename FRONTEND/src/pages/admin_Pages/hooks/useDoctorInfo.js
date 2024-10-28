import { useState, useEffect } from 'react';
import {axiosInstance} from "../../../service/apiRequest.js";


export const useDoctorInfo = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllDoctors = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/listAllVeterinary');
            // Đảm bảo rằng mỗi bác sĩ trong response.data có trường id
            setDoctors(response.data);
            setLoading(false);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Có lỗi xảy ra khi tải danh sách bác sĩ');
            setLoading(false);
        }
    };

    const deleteDoctor = async (id) => {
        try {
            await axiosInstance.delete(`/admin/deleteVeterinaryInfo?id=${id}`);
            await fetchAllDoctors(); // Cập nhật lại danh sách sau khi xóa
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            throw new Error('Có lỗi xảy ra khi xóa thông tin bác sĩ');
        }
    };

    const updateDoctorInfo = async (originalPhone, formData) => {
        try {
            const response = await axiosInstance.put(
                `/admin/updateDoctorInfo/${originalPhone}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật thông tin bác sĩ');
        }
    };
    

    const getDoctorDetail = async (doctorId) => {
        try {
            console.log('doctorId:', doctorId);
            const response = await axiosInstance.get(`/admin/getInfoDoctor/${doctorId}`);
            return response.data;
        } catch (err) {
            console.error('Lỗi khi lấy thông tin chi tiết bác sĩ:', err);
            throw new Error('Có lỗi xảy ra khi lấy thông tin chi tiết bác sĩ');
        }
    };

    useEffect(() => {
        fetchAllDoctors();
    }, []);

    const addDoctor = async (doctorData) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/admin/addDoctor', doctorData);
            await fetchAllDoctors();
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data || 'Đã xảy ra lỗi khi thêm bác sĩ';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    return {
        doctors,
        loading,
        error,
        fetchAllDoctors,
        deleteDoctor,
        updateDoctorInfo,
        getDoctorDetail,
        addDoctor
    };
};
