import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../service/apiRequest';
import { message } from 'antd';
import moment from 'moment';

const fetchAppointmentDetail = async (appointmentId) => {
    try {
        const response = await axiosInstance.get(`/veterinary/getListAppointmentDoctor/${appointmentId}`);
        
        // Transform data to match the component's expected format
        const transformedData = {
            id: response.data.id,
            customerInfo: {
                name: response.data.fullNameCustomer,
                phone: response.data.phoneNumber,
                address: response.data.addressDetails
            },
            appointmentInfo: {
                createdDate: response.data.createdDate,
                service: response.data.nameService,
                appointmentDate: response.data.appointmentBookingDate,
                appointmentTime: response.data.appointmentBookingTime,
                address: `${response.data.addressDetails}, ${response.data.nameZone}`,
                status: response.data.appointmentStatus,
                doctor: response.data.isSelectDoctor,
                description: response.data.description
            }
        };

        return transformedData;
    } catch (err) {
        console.error('Error fetching appointment detail:', err);
        message.error('Có lỗi xảy ra khi tải chi tiết lịch hẹn');
        throw err;
    }
};

const useDoctorAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState({
        totalAppointments: 0,
        cancelledAppointments: 0,
        doneAppointments: 0,
        waitAppointments: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [supportServices, setSupportServices] = useState([]);

    const fetchStats = async () => {
        try {
            const response = await axiosInstance.get('/veterinary/countStatusTotal');
            if (response.data) {
                setStats(response.data);
            }
        } catch (err) {
            console.error('Error fetching stats:', err);
            message.error('Có lỗi xảy ra khi tải thống kê');
        }
    };

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/veterinary/getListAppointmentDoctor');
            console.log('Response from API:', response.data);
            const transformedData = response.data.map(appointment => ({
                id: appointment.appointmentId.toString(),
                date: moment(appointment.appointmentDate).format('YYYY-MM-DD'),
                time: moment(appointment.appointmentTime, 'HH:mm:ss').format('HH:mm:ss'),
                service: appointment.serviceType,
                status: appointment.appointmentStatus,
            }));
            console.log('Transformed data:', transformedData);
            setAppointments(transformedData);
            setError(null);
            
            // Fetch stats after appointments
            await fetchStats();
        } catch (err) {
            setError('Không thể tải danh sách lịch hẹn');
            message.error('Có lỗi xảy ra khi tải danh sách lịch hẹn');
            console.error('Error fetching appointments:', err);
        } finally {
            setLoading(false);
        }
    };

    const confirmAppointment = async (appointmentId) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(
                `/veterinary/isDoctorConfirm/${appointmentId}`);
            
            if (response.data) {
                message.success('Xác nhận lịch hẹn thành công');
                // Refresh the appointments list
                await fetchAppointments();
            }
            return response.data;
        } catch (err) {
            message.error('Có lỗi xảy ra khi xác nhận lịch hẹn');
            console.error('Error confirming appointment:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const startService = async (appointmentId) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(
                `/veterinary/updateWorkingStatus/${appointmentId}`
            );
            
            if (response.data) {
                message.success('Đã tiếp nhận dịch vụ thành công');
                // Refresh the appointments list
                await fetchAppointments();
            }
            return response.data;
        } catch (err) {
            message.error('Có lỗi xảy ra khi tiếp nhận dịch vụ');
            console.error('Error starting service:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const saveServiceRecord = async (appointmentId, serviceData) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(
                `/veterinary/saveServiceTypeAdd/${appointmentId}`,
                serviceData
            );
            
            if (response.data) {
                message.success('Đã lưu hồ sơ bệnh nhân thành công');
                // Refresh the appointments list
                await fetchAppointments();
            }
            return response.data;
        } catch (err) {
            message.error('Có lỗi xảy ra khi lưu hồ sơ bệnh nhân');
            console.error('Error saving service record:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId, cancelReason) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(
                `/veterinary/isDoctorCancel/true`,
                {
                    appointmentId: appointmentId,
                    cancelReason: cancelReason
                }
            );
            
            if (response.data) {
                message.success('Đã hủy lịch hẹn thành công');
                await fetchAppointments();
            }
            return response.data;
        } catch (err) {
            message.error('Có lỗi xảy ra khi hủy lịch hẹn');
            console.error('Error canceling appointment:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctorInfo = async () => {
        try {
            const response = await axiosInstance.get('/veterinary/getInfoCurrentDoctor');
            if (response.data) {
                setDoctorInfo(response.data.doctorInfo);
                setFeedbacks(response.data.feedback.filter(fb => fb.username !== null));
            }
        } catch (err) {
            console.error('Error fetching doctor info:', err);
            message.error('Có lỗi xảy ra khi tải thông tin bác sĩ');
        }
    };

    const updateDoctorInfo = async (formData) => {
        try {
            setLoading(true);
            const formDataToSend = new FormData();

            console.log('Input formData:', formData);

            formDataToSend.append('fullName', formData.fullName);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('experience', formData.experience);
            formDataToSend.append('specialty', formData.specialty);
            formDataToSend.append('qualification', formData.qualification);
            formDataToSend.append('description', formData.description);

            if (formData.imageFile) {
                formDataToSend.append('ImageUrl', formData.imageFile);
            }

            for (let pair of formDataToSend.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const response = await axiosInstance.put(
                '/veterinary/updateDoctorInfoByDoctor',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('API Response:', response);

            if (response.data) {
                message.success('Cập nhật thông tin thành công');
                await fetchDoctorInfo();
                return true;
            }
        } catch (err) {
            console.error('Chi tiết lỗi:', err.response?.data);
            message.error('Có lỗi xảy ra khi cập nhật thông tin');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (passwordData) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/veterinary/changePasswordDoctor', {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
                confirmPassword: passwordData.confirmPassword
            });

            if (response.data) {
                message.success('Đổi mật khẩu thành công');
                return true;
            }
        } catch (err) {
            if (err.response?.status === 400) {
                throw new Error(err.response.data);
            }
            message.error('Có lỗi xảy ra khi đổi mật khẩu');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchSupportServices = async () => {
        try {
            const response = await axiosInstance.get('/getAllSupportServiceType');
            if (response.data) {
                setSupportServices(response.data);
            }
        } catch (err) {
            console.error('Error fetching support services:', err);
            message.error('Có lỗi xảy ra khi tải danh sách dịch vụ bổ sung');
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchAppointments();
        fetchDoctorInfo();
        fetchSupportServices();
    }, []);

    return {
        appointments,
        stats,
        loading,
        error,
        refreshAppointments: fetchAppointments,
        confirmAppointment,
        startService,
        saveServiceRecord,
        doctorInfo,
        feedbacks,
        refreshDoctorInfo: fetchDoctorInfo,
        updateDoctorInfo,
        changePassword,
        cancelAppointment,
        fetchAppointmentDetail,
        supportServices,
    };
};

export default useDoctorAppointment;