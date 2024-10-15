import { useState, useEffect } from 'react';
import { VeterianScheduleCenter, VeterianScheduleHome } from "../services/apiVeterian.js";

const useBookingPage = () => {
    const [serviceType, setServiceType] = useState('onlineConsultation');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null); // ID của bác sĩ
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [detailedAddress, setDetailedAddress] = useState(''); // Địa chỉ chi tiết
    const [dateOptions, setDateOptions] = useState([]); // Danh sách các ngày khả dụng

    // Lấy giờ có sẵn dựa trên ngày và dịch vụ được chọn
    useEffect(() => {
        const fetchAvailableTimes = async () => {
            let availableTimesData = [];
            if (serviceType === 'homeSurvey' || serviceType === 'homeTreatment') {
                const data = await VeterianScheduleHome();
                const filteredDates = Object.keys(data).filter((date) => {
                    // Loại bỏ ngày trùng
                    return data[date].some(slot => slot.available);
                });
                setDateOptions(filteredDates);
                availableTimesData = data[selectedDate]?.filter(time => time.available) || [];
            } else if (serviceType === 'centerTreatment' && selectedDoctor && selectedDate) {
                const data = await VeterianScheduleCenter(selectedDoctor); // Truyền doctorId
                const filteredTimes = data[selectedDate]?.filter(time => time.available) || [];
                availableTimesData = removeOverlappingTimes(filteredTimes);
            }
            setAvailableTimes(availableTimesData);
        };

        if (selectedDate || (serviceType === 'centerTreatment' && selectedDoctor)) {
            fetchAvailableTimes();
        }
    }, [selectedDate, selectedDoctor, serviceType]);

    // Xử lý chọn bác sĩ (cập nhật ID của bác sĩ)
    const handleDoctorSelect = (doctorId) => {
        setSelectedDoctor(doctorId); // Lưu doctorId vào state
    };

    // Hàm loại bỏ các khoảng thời gian trùng lặp
    const removeOverlappingTimes = (timeSlots) => {
        const uniqueTimes = [];
        timeSlots.forEach(slot => {
            const exists = uniqueTimes.some(ut => ut.startTime === slot.startTime && ut.endTime === slot.endTime);
            if (!exists) {
                uniqueTimes.push(slot);
            }
        });
        return uniqueTimes;
    };

    return {
        serviceType,
        setServiceType,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        selectedDoctor,
        setSelectedDoctor,
        handleDoctorSelect,
        availableTimes,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        detailedAddress,
        setDetailedAddress,
        dateOptions, // Ngày khả dụng cho dịch vụ tại nhà
    };
};

export default useBookingPage;
