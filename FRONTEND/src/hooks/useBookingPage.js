import { useState, useEffect } from "react";
import { ServiceList, getDistrict } from "../services/apiService.js";
import {
    VeterianScheduleTimeSlot,
    VeterianList,
    VeterianScheduleTimePeriods,
} from "../services/apiVeterian.js";

export const useBookingPage = () => {
    const [services, setServices] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [specialty, setSpecialty] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('Ho Chi Minh');
    const [doctor, setDoctor] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesData, districtsData, doctorsData, periodsData, timeSlotsData] = await Promise.all([
                    ServiceList(),
                    getDistrict(),
                    VeterianList(),
                    VeterianScheduleTimePeriods(),
                    VeterianScheduleTimeSlot()
                ]);

                setServices(servicesData);
                setDistricts(districtsData);
                setDoctors(doctorsData);
                setPeriods(periodsData);
                setTimeSlots(timeSlotsData);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            if (doctor) {
                // Nếu người dùng chọn bác sĩ, tìm các slot thời gian của bác sĩ đó
                const doctorSchedule = timeSlots.find((slot) => slot.doctor_id === doctor);
                const availableSlots = doctorSchedule?.timeslots.find((slot) => slot.date === selectedDate)?.times || [];
                setAvailableTimes(availableSlots);
            } else {
                // Nếu người dùng không chọn bác sĩ nhưng chọn ngày, hiển thị tất cả timeslots của tất cả bác sĩ trong ngày đó
                const allSlots = timeSlots
                    .flatMap((slot) => slot.timeslots)
                    .filter((slot) => slot.date === selectedDate)
                    .flatMap((slot) => slot.times);

                // Lọc các slot trùng nhau
                const uniqueSlots = [...new Set(allSlots)];
                setAvailableTimes(uniqueSlots);
            }
        } else {
            setAvailableTimes([]);
        }
    }, [doctor, selectedDate, timeSlots]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            specialty,
            phoneNumber,
            description,
            address,
            district,
            doctor,
            timePeriod,
            selectedDate,
            selectedTime,
        });
    };

    return {
        services,
        districts,
        doctors,
        periods,
        timeSlots,
        specialty,
        setSpecialty,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        address,
        setAddress,
        district,
        setDistrict,
        doctor,
        setDoctor,
        timePeriod,
        setTimePeriod,
        selectedDate,
        setSelectedDate,
        availableTimes,
        selectedTime,
        setSelectedTime,
        handleSubmit,
    };
};
