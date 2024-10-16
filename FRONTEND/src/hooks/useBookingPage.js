import { useState, useEffect } from 'react';
import {
    VeterianScheduleHome,
    VeterianScheduleCenter,
    VeterianScheduleCenterWithoutDoctor
} from '../services/apiVeterian.js'; // Các API để lấy dữ liệu thời gian

export default function useBookingPage() {
    const [serviceType, setServiceType] = useState('');  // Loại dịch vụ
    const [phoneNumber, setPhoneNumber] = useState('');  // Số điện thoại
    const [description, setDescription] = useState('');  // Mô tả
    const [selectedDate, setSelectedDate] = useState('');  // Ngày đã chọn
    const [selectedTime, setSelectedTime] = useState('');  // Giờ đã chọn
    const [detailedAddress, setDetailedAddress] = useState('');  // Địa chỉ chi tiết
    const [selectedDistrict, setSelectedDistrict] = useState('');  // Quận/Huyện
    const [selectedDoctor, setSelectedDoctor] = useState('dr0');  // Bác sĩ đã chọn
    const [availableTimes, setAvailableTimes] = useState([]);  // Danh sách giờ khả dụng
    const [dateOptions, setDateOptions] = useState([]);  // Danh sách ngày khả dụng

    // Hàm sắp xếp ngày theo thứ tự tăng dần
    const sortDates = (dates) => {
        return dates.sort((a, b) => new Date(a) - new Date(b));  // Sắp xếp ngày theo thứ tự tăng dần
    };

    // Gọi API lấy danh sách ngày và giờ khả dụng cho dịch vụ tại nhà
    const fetchHomeServiceTimes = async () => {
        try {
            const data = await VeterianScheduleHome();

            // Lọc các ngày có lịch rảnh
            let filteredDates = Object.keys(data).filter((date) => {
                return data[date].some(slot => slot.available);
            });

            // Sắp xếp ngày theo thứ tự tăng dần
            filteredDates = sortDates(filteredDates);

            // Cập nhật danh sách ngày khả dụng
            setDateOptions(filteredDates);

            // Nếu đã chọn ngày, lấy các giờ có sẵn cho ngày đó
            const availableTimesData = data[selectedDate]?.filter(time => time.available) || [];
            setAvailableTimes(availableTimesData);

            console.log('Available Times for Home Service:', availableTimesData);
        } catch (error) {
            console.error('Error fetching home service times:', error);
        }
    };

    const fecthCenterServiceTimesWithoutSelectDoctor = async () => {
        try {
            const data = await VeterianScheduleCenterWithoutDoctor();

            // Lưu toàn bộ object ngày và giờ vào availableTimes
            const availableTimesData = data[selectedDate]?.filter(time => time.available) || [];
            setAvailableTimes(availableTimesData);

            // Lấy danh sách ngày từ dữ liệu trả về và sắp xếp
            let dateList = Object.keys(data);
            dateList = sortDates(dateList);

            // Cập nhật danh sách ngày
            setDateOptions(dateList);

            console.log('Available Times for Center Service:', availableTimesData);
        }catch (error) {
            console.error('Error fetching center service times:', error);
        }
    }

    // Gọi API lấy danh sách ngày và giờ khả dụng cho dịch vụ tại trung tâm
    const fetchCenterServiceTimes = async () => {
        try {
            const data = await VeterianScheduleCenter(selectedDoctor);

            // Lưu toàn bộ object ngày và giờ vào availableTimes
            const availableTimesData = data[selectedDate]?.filter(time => time.available) || [];
            setAvailableTimes(availableTimesData);

            // Lấy danh sách ngày từ dữ liệu trả về và sắp xếp
            let dateList = Object.keys(data);
            dateList = sortDates(dateList);

            // Cập nhật danh sách ngày
            setDateOptions(dateList);

            console.log('Available Times for Center Service:', availableTimesData);
        } catch (error) {
            console.error('Error fetching center service times:', error);
        }
    };

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            if (serviceType === '2' || serviceType === '4') { // Dịch vụ tại nhà
                await fetchHomeServiceTimes();
            } else if (serviceType === '3') { // Dịch vụ trung tâm
                if (selectedDoctor === 'dr0') {
                    await fecthCenterServiceTimesWithoutSelectDoctor();
                }else {
                    await fetchCenterServiceTimes();
                }
            }

            console.log('Selected Date:', selectedDate);
            console.log('Available Times:', availableTimes);
            console.log('Date Options:', dateOptions);
        };

        // Chỉ gọi API khi đã chọn dịch vụ hoặc bác sĩ
        if ((serviceType === '2' || serviceType === '4') || (serviceType === '3' && selectedDoctor)) {
            fetchAvailableTimes();
        }
    }, [selectedDate, selectedDoctor, serviceType]);

    // Xử lý chọn bác sĩ (chỉ cho dịch vụ trung tâm)
    const handleDoctorSelect = (doctorId) => {
        setSelectedDoctor(doctorId);  // Lưu doctorId vào state
        setSelectedDate('');          // Reset selected date
        setAvailableTimes([]);        // Reset available times
        setDateOptions([]);           // Reset date options
    };

    // Xử lý submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingData = {
            serviceType,
            phoneNumber,
            description,
            selectedDate,
            selectedTime,
            detailedAddress,
            selectedDistrict,
            selectedDoctor,
        };

        // Xử lý gửi dữ liệu booking đến backend
        console.log('Booking data submitted:', bookingData);
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
        handleDoctorSelect,
        handleSubmit,
    };
}
