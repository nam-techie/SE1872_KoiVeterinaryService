import { useState, useEffect } from 'react';
import { VeterianScheduleHome, VeterianScheduleCenterByID, VeterianScheduleCenter } from '../services/apiVeterian.js';
import {useNavigate} from "react-router-dom";

export default function useBookingPage() {
    const [serviceType, setServiceType] = useState('');  // Loại dịch vụ
    const [phoneNumber, setPhoneNumber] = useState('');  // Số điện thoại
    const [description, setDescription] = useState('');  // Mô tả
    const [selectedDate, setSelectedDate] = useState('');  // Ngày đã chọn
    const [selectedTime, setSelectedTime] = useState('');  // Thời gian đã chọn
    const [detailedAddress, setDetailedAddress] = useState('');  // Địa chỉ chi tiết
    const [selectedDistrict, setSelectedDistrict] = useState('');  // Quận/Huyện đã chọn
    const [selectedDoctor, setSelectedDoctor] = useState('dr0');  // Bác sĩ đã chọn
    const [availableTimes, setAvailableTimes] = useState([]);  // Các khung thời gian có sẵn
    const [dateOptions, setDateOptions] = useState([]);  // Các ngày có sẵn
    const [errors, setErrors] = useState({ phoneNumber: '', detailedAddress: '', selectedDate: '', selectedTime: '', selectedDistrict: '' });  // Lỗi
    const [showConfirm, setShowConfirm] = useState(false);  // Trạng thái hiển thị xác nhận
    const navgigate = useNavigate();
    const sortDates = (dates) => {
        return dates.sort((a, b) => new Date(a) - new Date(b));  // Sắp xếp ngày theo thứ tự tăng dần
    };

    const fetchHomeServiceTimes = async () => {
        try {
            const data = await VeterianScheduleHome();
            let filteredDates = Object.keys(data).filter((date) => data[date].some(slot => slot.available));

            filteredDates = sortDates(filteredDates);
            setDateOptions(filteredDates);

            const availableTimesData = data[selectedDate]?.filter(time => time.available) || [];
            setAvailableTimes(availableTimesData);
        } catch (error) {
            console.error('Error fetching home service times:', error);
        }
    };

    const fetchCenterService = async () => {
        try {
            const data = await VeterianScheduleCenter();
            let filteredDates = Object.keys(data).filter((date) => data[date].some(slot => slot.available));

            filteredDates = sortDates(filteredDates);
            setDateOptions(filteredDates);

            const availableTimesData = data[selectedDate]?.filter(time => time.available) || [];
            setAvailableTimes(availableTimesData);
        } catch (error) {
            console.error('Error fetching center service times:', error);
        }
    };

    const fetchCenterServiceTimesByID = async () => {
        try {
            const data = await VeterianScheduleCenterByID(selectedDoctor);

            const availableTimesData = data[selectedDate]?.filter(time => time.available) || [];
            setAvailableTimes(availableTimesData);

            let dateList = Object.keys(data);
            dateList = sortDates(dateList);
            setDateOptions(dateList);
        } catch (error) {
            console.error('Error fetching center service times:', error);
        }
    };

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            if (serviceType === '2' || serviceType === '4') {
                await fetchHomeServiceTimes();
            } else if (serviceType === '3' && selectedDoctor) {
                if (selectedDoctor === 'dr0') {
                    await fetchCenterService();
                } else {
                    await fetchCenterServiceTimesByID();
                }
            }
        };

        if ((serviceType === '2' || serviceType === '4') || (serviceType === '3' && selectedDoctor)) {
            fetchAvailableTimes();
        }
    }, [selectedDate, selectedDoctor, serviceType]);

    useEffect(() => {
        if (selectedDate) {
            console.log('Selected Date has been updated:', selectedDate);
        }
    }, [selectedDate]);

    const handleDoctorSelect = (doctorId) => {
        setSelectedDoctor(doctorId);
        setSelectedDate('');  // Reset ngày khi chọn bác sĩ khác
        setAvailableTimes([]);
        setDateOptions([]);
    };

    const handleConfirm = () => {
        const hasErrors = handleSubmit();
        if (!hasErrors) {
            setShowConfirm(true);  // Hiển thị modal xác nhận
        }
    };

    const handleFinalSubmit = async () => {
        setShowConfirm(false);  // Đóng modal xác nhận và gửi form

        const createdDate = new Date();
        const currentTime = `${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`;

        const finalSelectedDate = serviceType === '1' ? createdDate.toISOString().split('T')[0] : selectedDate;
        const finalSelectedTime = serviceType === '1' ? currentTime : selectedTime;
        const finalDetailedAddress = (serviceType === '1' || serviceType === '3') ? null : detailedAddress;
        const finalSelectedDistrict = (serviceType === '3' || serviceType === '1') ? null : selectedDistrict;
        const finalSelectedDoctor = (serviceType === '1' || serviceType === '2' || serviceType === '4') ? null : selectedDoctor;

        const bookingData = {
            serviceType,
            phoneNumber,
            description,
            selectedDate: finalSelectedDate,
            selectedTime: finalSelectedTime,
            detailedAddress: finalDetailedAddress,
            selectedDistrict: finalSelectedDistrict,
            selectedDoctor: finalSelectedDoctor,
            createdDate: createdDate.toISOString(),
        };

        console.log('Booking data submitted:', bookingData);
        // Call the API to submit bookingData here

        navgigate("/booking-service-history");
    };

    const handleSubmit = () => {
        let hasErrors = false;
        const newErrors = { phoneNumber: '', detailedAddress: '', selectedDate: '', selectedTime: '', selectedDistrict: '' };

        if (!phoneNumber) {
            newErrors.phoneNumber = 'Số điện thoại là bắt buộc';
            hasErrors = true;
        }

        if ((serviceType === '2' || serviceType === '4') && !detailedAddress) {
            newErrors.detailedAddress = 'Vui lòng nhập địa chỉ chi tiết cho dịch vụ tại nhà';
            newErrors.selectedDistrict = 'Vui lòng chọn hãy chọn quận ';
            hasErrors = true;
        }

        if (serviceType !== '1') {
            if (!selectedDate) {
                newErrors.selectedDate = 'Vui lòng chọn ngày';
                hasErrors = true;
            }
            if (!selectedTime) {
                newErrors.selectedTime = 'Vui lòng chọn thời gian';
                hasErrors = true;
            }
        }

        setErrors(newErrors);
        return hasErrors;
    };

    return {
        serviceType,
        setServiceType,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        detailedAddress,
        setDetailedAddress,
        selectedDistrict,
        setSelectedDistrict,
        selectedDoctor,
        availableTimes,
        dateOptions,
        errors,
        handleDoctorSelect,
        handleConfirm,
        handleFinalSubmit,
        handleSubmit,
        showConfirm,
    };
}
