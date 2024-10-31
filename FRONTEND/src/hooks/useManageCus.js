import { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../service/apiRequest';

const useManageCus = () => {
    const getAppointments = async () => {
        try {
            const response = await axiosInstance.get(
                `/customer/listAppointmentUser`
            );

            console.log('Response from API:', response.data);

            if (response.data) {
                return response.data;
            } else {
                throw new Error('Không có dữ liệu trả về');
            }
        } catch (err) {
            console.error('Error fetching appointments:', err);
            throw new Error('Có lỗi xảy ra khi tải dữ liệu');
        }
    };

    return {
        getAppointments,
    };
};

export default useManageCus; 