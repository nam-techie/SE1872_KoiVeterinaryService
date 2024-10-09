import { useState, useEffect } from "react";
import { ServiceList, getDistrict } from "../services/apiService.js";
import { VeterianList, VeterianScheduleTimePeriods ,VeterianScheduleAvailableSlots,VeterianScheduleAvailableDay} from "../services/apiVeterian.js";

export const useBookingPage = () => {
    const [services, setServices] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [periods, setPeriods] = useState([]);  // periods được giữ nguyên
    const [specialty, setSpecialty] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [doctor, setDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [timePeriod, setTimePeriod] = useState('');  // Thêm lại state cho timePeriod

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesData, districtsData, doctorsData, periodsData] = await Promise.all([
                    ServiceList(),
                    getDistrict(),
                    VeterianList(),
                    VeterianScheduleTimePeriods()
                ]);

                setServices(servicesData);
                setDistricts(districtsData);
                setDoctors(doctorsData);
                setPeriods(periodsData);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, []);

    // Khi chọn bác sĩ, lấy danh sách ngày khả dụng
    useEffect(() => {
        const loadAvailableDates = async () => {
            if (doctor) {
                const dates = await VeterianScheduleAvailableDay(doctor);
                setAvailableDates(dates);  // Cập nhật danh sách ngày khả dụng
                setSelectedDate('');  // Xóa ngày đã chọn khi đổi bác sĩ
                setAvailableTimes([]); // Xóa các slot thời gian khi đổi bác sĩ
            } else {
                setAvailableDates([]);
                setAvailableTimes([]);
            }
        };

        loadAvailableDates();
    }, [doctor]);  // Sẽ gọi lại khi bác sĩ thay đổi

    useEffect(() => {
        console.log('Available dates: ', availableDates);  // Xem danh sách ngày có xuất hiện không
    }, [availableDates]);

    // Khi chọn ngày, lấy danh sách thời gian khả dụng
    useEffect(() => {
        const loadAvailableTimes = async () => {
            if (doctor && selectedDate) {
                const times = await VeterianScheduleAvailableSlots(doctor, selectedDate);
                setAvailableTimes(times);  // Cập nhật danh sách slot thời gian khả dụng
            } else {
                setAvailableTimes([]);
            }
        };

        loadAvailableTimes();
    }, [doctor, selectedDate]);  // Cập nhật khi doctor hoặc selectedDate thay đổi

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            specialty,
            phoneNumber,
            description,
            address,
            doctor,
            selectedDate,
            selectedTime,
            timePeriod,  // Thêm lại timePeriod vào submit log
        });
    };

    return {
        services,
        districts,
        doctors,
        periods,
        specialty,
        setSpecialty,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        address,
        setAddress,
        doctor,
        setDoctor,
        availableDates,
        selectedDate,
        setSelectedDate,
        availableTimes,
        selectedTime,
        setSelectedTime,
        timePeriod,  // Trả lại timePeriod
        setTimePeriod,  // Trả lại setTimePeriod
        handleSubmit,
    };
};
