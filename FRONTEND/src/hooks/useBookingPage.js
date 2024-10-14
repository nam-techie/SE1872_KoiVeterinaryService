import { useState, useEffect } from 'react';
import { VeterianList, VeterianScheduleCenter, VeterianScheduleHome } from "../services/apiVeterian.js";
import { getService, getDistrict } from "../services/apiService.js";

const useBookingPage = () => {
    const [serviceType, setServiceType] = useState('onlineConsultation'); // Dịch vụ mặc định
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [veterians, setVeterians] = useState([]); // Danh sách bác sĩ
    const [selectedDoctor, setSelectedDoctor] = useState(null); // Dùng cho dịch vụ khám tại trung tâm
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [districts, setDistricts] = useState([]); // Dùng để lấy danh sách quận/huyện
    const [selectedDistrict, setSelectedDistrict] = useState(''); // Quận/huyện được chọn
    const [detailedAddress, setDetailedAddress] = useState(''); // Địa chỉ chi tiết
    const [services, setServices] = useState([]); // Dùng để so sánh dịch vụ

    // Lấy thông tin dịch vụ
    useEffect(() => {
        const fetchServices = async () => {
            const data = await getService();
            setServices(data);
        };

        fetchServices();
    }, []);

    // Lấy danh sách bác sĩ
    useEffect(() => {
        const fetchVeterianList = async () => {
            const data = await VeterianList();
            setVeterians(data); // Gán dữ liệu vào biến veterians để dùng trong chọn bác sĩ
        };

        fetchVeterianList();
    }, []);

    // Lấy thông tin quận/huyện
    useEffect(() => {
        const fetchDistrictList = async () => {
            const data = await getDistrict();
            setDistricts(data);
        };

        fetchDistrictList();
    }, []);

    // Lấy giờ có sẵn dựa trên ngày và dịch vụ được chọn
    useEffect(() => {
        const fetchAvailableTimes = async () => {
            let availableTimesData = [];
            if (serviceType === 'homeSurvey' || serviceType === 'homeTreatment') {
                // Dịch vụ tại nhà không cần bác sĩ
                const data = await VeterianScheduleHome();
                availableTimesData = data[selectedDate]?.filter(time => time.available) || [];
            } else if (serviceType === 'centerTreatment' && selectedDoctor && selectedDate) {
                // Dịch vụ tại trung tâm cần bác sĩ
                const data = await VeterianScheduleCenter(selectedDoctor.id);
                availableTimesData = data[selectedDate]?.filter(time => time.available) || [];
            }
            setAvailableTimes(availableTimesData);
        };

        if (selectedDate) {
            fetchAvailableTimes(); // Gọi API khi người dùng chọn ngày và có bác sĩ (trung tâm)
        }
    }, [selectedDate, selectedDoctor, serviceType]);

    // Xử lý chọn bác sĩ
    const handleDoctorSelect = (doctorId) => {
        const selected = veterians.find(doctor => doctor.id === doctorId);
        setSelectedDoctor(selected);
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
        handleDoctorSelect, // Hàm chọn bác sĩ
        availableTimes,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        districts,
        selectedDistrict,
        setSelectedDistrict,
        detailedAddress,
        setDetailedAddress,
        services,
        veterians, // Biến dùng để hiển thị danh sách bác sĩ
    };
};

export default useBookingPage;
