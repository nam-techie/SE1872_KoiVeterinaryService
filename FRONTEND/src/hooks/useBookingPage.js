import { useState, useEffect } from 'react';
import { VeterianScheduleCenter, VeterianScheduleHome } from "../services/apiVeterian.js";

const useBookingPage = () => {
    const [serviceType, setServiceType] = useState('1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null); // ID của bác sĩ
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [detailedAddress, setDetailedAddress] = useState(''); // Địa chỉ chi tiết
    const [dateOptions, setDateOptions] = useState([]); // Danh sách các ngày khả dụng

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            let availableTimesData = [];

            if (serviceType === '2' || serviceType === '4') {
                const data = await VeterianScheduleHome();

                // Lọc các ngày có lịch rảnh
                const filteredDates = Object.keys(data).filter((date) => {
                    return data[date].some(slot => slot.available);
                });

                // Cập nhật danh sách ngày khả dụng
                setDateOptions(filteredDates);

                // Nếu đã chọn ngày, lấy các giờ có sẵn cho ngày đó
                availableTimesData = data[selectedDate]?.filter(time => time.available) || [];
            } else if (serviceType === '3' && selectedDoctor) {
                const data = await VeterianScheduleCenter(selectedDoctor);

                // Nếu có selectedDate, lọc lịch theo ngày
                if (selectedDate) {
                    // Lấy lịch từ data cho ngày đã chọn
                    availableTimesData = data[selectedDate]?.filter(time => time.available) || [];


                }
            }

            // Cập nhật danh sách giờ có sẵn
            setAvailableTimes(availableTimesData);
        };

        // Gọi hàm fetch khi có selectedDate hoặc doctor được chọn
        if (selectedDate || (serviceType === '3' && selectedDoctor)) {
            fetchAvailableTimes();
        }
    }, [selectedDate, selectedDoctor, serviceType]);

    // Xử lý chọn bác sĩ (cập nhật ID của bác sĩ)
    const handleDoctorSelect = (doctorId) => {
        setSelectedDoctor(doctorId); // Lưu doctorId vào state
        setSelectedDate(''); // Reset selected date
        setAvailableTimes([]); // Reset available times
        setDateOptions([]); // Reset date options
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
