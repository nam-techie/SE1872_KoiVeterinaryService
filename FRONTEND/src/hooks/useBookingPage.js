import { useState, useEffect } from 'react';
import { VeterianScheduleInCenter, VeterianScheduleAtHome,VeterianList } from '../services/apiVeterian';
import { getService, getDistrict } from '../services/apiService';

export const useBookingPage = () => {
    const [specialty, setSpecialty] = useState('');
    const [services, setServices] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [periods, setPeriods] = useState([]); // Mảng lưu periods
    const [districtList, setDistrictList] = useState([]);
    const [doctor, setDoctor] = useState();
    const [doctorList, setDoctorList] = useState([]);
    const [availableDates, setAvailableDates] = useState([]); // Ngày có sẵn
    const [availableTimes, setAvailableTimes] = useState({}); // Thời gian có sẵn theo ngày

    // Lấy danh sách dịch vụ
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const serviceData = await getService();
                setServices(serviceData);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách dịch vụ:', error);
            }
        };
        fetchServices();
    }, []);

    // Lấy danh sách quận khi chọn dịch vụ tại nhà
    useEffect(() => {
        if (specialty === 'home-survey' || specialty === 'home-treatment') {
            const fetchDistricts = async () => {
                try {
                    const districtData = await getDistrict();
                    setDistrictList(districtData);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách quận:', error);
                }
            };
            fetchDistricts();
        }
    }, [specialty]);

    // Lấy lịch từ API cho dịch vụ tại nhà và lưu vào periods
    useEffect(() => {
        if (specialty === 'home-survey' || specialty === 'home-treatment') {
            const fetchHomeSchedule = async () => {
                try {
                    const homeScheduleData = await VeterianScheduleAtHome();
                    if (homeScheduleData && typeof homeScheduleData === 'object') {
                        const dates = Object.keys(homeScheduleData); // Lấy danh sách ngày
                        setAvailableDates(dates);

                        // Lưu thời gian tương ứng theo ngày vào periods
                        const periodsData = dates.flatMap(date => homeScheduleData[date]);
                        setPeriods(periodsData); // Lưu vào periods
                    } else {
                        setAvailableDates([]);
                        setPeriods([]); // Reset periods nếu không có dữ liệu
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy lịch tại nhà:', error);
                    setAvailableDates([]);
                    setPeriods([]); // Đảm bảo periods là mảng rỗng khi có lỗi
                }
            };
            fetchHomeSchedule();
        }
    }, [specialty]);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const districtData = await getDistrict();
                setDistrictList(districtData); // Cập nhật danh sách quận
            } catch (error) {
                console.error('Lỗi khi lấy danh sách quận:', error);
            }
        };
        fetchDistricts();
    }, []);

    // Lấy danh sách bác sĩ từ API
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorData = await VeterianList();
                setDoctorList(doctorData); // Cập nhật danh sách bác sĩ
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bác sĩ:', error);
            }
        };
        fetchDoctors();
    }, []);
    // Lấy lịch cho dịch vụ tại trung tâm dựa vào bác sĩ được chọn
    useEffect(() => {
        if (doctor && specialty === 'center-appointment') {
            const fetchCenterSchedule = async () => {
                try {
                    const centerScheduleData = await VeterianScheduleInCenter(doctor.id);
                    if (centerScheduleData.length > 0) {
                        const dates = centerScheduleData.reduce((acc, slot) => {
                            const date = slot.date;
                            if (!acc[date]) {
                                acc[date] = [];
                            }
                            acc[date].push(slot);
                            return acc;
                        }, {});
                        setAvailableDates(Object.keys(dates));
                        setAvailableTimes(dates); // Lưu thời gian dựa trên từng ngày
                        setPeriods(Object.values(dates).flat()); // Lưu tất cả periods theo ngày
                    } else {
                        setAvailableDates([]);
                        setAvailableTimes({});
                        setPeriods([]);
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy lịch tại trung tâm:', error);
                    setAvailableDates([]);
                    setAvailableTimes({});
                    setPeriods([]); // Đảm bảo periods luôn là mảng rỗng khi có lỗi
                }
            };
            fetchCenterSchedule();
        }
    }, [doctor, specialty]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic khi submit form
    };

    return {
        specialty,
        setSpecialty,
        services,
        setServices,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        address,
        setAddress,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        timePeriod,
        setTimePeriod,
        periods,
        districtList, // Sử dụng danh sách quận từ state
        doctor,
        setDoctor,
        doctorList, // Sử dụng danh sách bác sĩ từ state
        availableDates,
        setDistrictList,
        availableTimes,
        handleSubmit,
    };
};
