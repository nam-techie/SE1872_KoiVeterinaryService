import { useState, useEffect } from "react";
import { ServiceList, getDistrict } from "../services/apiService.js";
import { VeterianList, VeterianScheduleTimePeriods, VeterianScheduleAvailableSlots, VeterianScheduleAvailableDay } from "../services/apiVeterian.js";

export const useBookingPage = () => {
    const [services, setServices] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [specialty, setSpecialty] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [doctor, setDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [timePeriod, setTimePeriod] = useState('');

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

    // Luôn hiển thị tất cả ngày và thời gian khả dụng nếu không có bác sĩ được chọn
    useEffect(() => {
        const loadAvailableDates = async () => {
            if (doctor) {
                const dates = await VeterianScheduleAvailableDay(doctor);
                setAvailableDates(dates);
                setSelectedDate('');
                setAvailableTimes([]);
            } else {
                let allDates = [];
                const promises = doctors.map(async (doc) => {
                    const dates = await VeterianScheduleAvailableDay(doc.id);
                    dates.forEach(dateObj => {
                        const existingDate = allDates.find(d => d.date === dateObj.date && d.startTime === dateObj.startTime && d.endTime === dateObj.endTime);
                        if (!existingDate) {
                            allDates.push(dateObj); // Thêm nếu chưa tồn tại
                        }
                    });
                });
                await Promise.all(promises);
                setAvailableDates(allDates);
            }
        };

        loadAvailableDates();
    }, [doctor, doctors]);  // Chạy lại khi bác sĩ hoặc danh sách bác sĩ thay đổi

    // Tự động hiển thị thời gian khả dụng khi không chọn bác sĩ
    useEffect(() => {
        const loadAvailableTimes = async () => {
            if (doctor && selectedDate) {
                const times = await VeterianScheduleAvailableSlots(doctor, selectedDate);
                setAvailableTimes(times);  // Cập nhật danh sách slot thời gian khả dụng của bác sĩ đã chọn
            } else if (selectedDate) {
                // Hợp nhất tất cả slot thời gian của tất cả bác sĩ cho ngày đã chọn
                let allTimes = [];
                const promises = doctors.map(async (doc) => {
                    const times = await VeterianScheduleAvailableSlots(doc.id, selectedDate);
                    allTimes = [...new Set([...allTimes, ...times])]; // Hợp nhất và loại bỏ trùng lặp
                });
                await Promise.all(promises);
                setAvailableTimes(allTimes);  // Cập nhật danh sách slot thời gian của tất cả bác sĩ cho ngày đã chọn
            } else {
                setAvailableTimes([]);
            }
        };

        loadAvailableTimes();
    }, [doctor, selectedDate, doctors]);  // Chạy lại khi bác sĩ, ngày hoặc danh sách bác sĩ thay đổi

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
