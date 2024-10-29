import {useState, useEffect} from 'react';
import {getdoctorScheduleHome, getdoctorScheduleCenter, getdoctorScheduleCenterByID} from '../service/apiDoctor.js';
import {useNavigate} from "react-router-dom";
import {postBookingData} from "../service/apiAppointments.js";

export function useBookingPage() {
    const [serviceType, setServiceType] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('dr0');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [dateOptions, setDateOptions] = useState([]);
    const [errors, setErrors] = useState({
        phoneNumber: '',
        detailedAddress: '',
        selectedDate: '',
        selectedTime: '',
        selectedDistrict: ''
    });
    const [showConfirm, setShowConfirm] = useState(false);
    const [agree, setAgree] = useState(false);  // Thêm trạng thái checkbox
    const navigate = useNavigate();

    const sortDates = (dates) => {
        return dates.sort((a, b) => new Date(a) - new Date(b));
    };

    const fetchHomeServiceTimes = async () => {
        try {
            const data = await getdoctorScheduleHome();
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
            const data = await getdoctorScheduleCenter();
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
            const data = await getdoctorScheduleCenterByID(selectedDoctor);
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

    const handleDoctorSelect = (doctorId) => {
        setSelectedDoctor(doctorId);
        setSelectedDate(''); // Reset ngày và thời gian khi chọn bác sĩ khác
        setAvailableTimes([]);
        setDateOptions([]);
    };

    const handleConfirm = () => {
        const hasErrors = handleSubmit();
        if (!hasErrors && agree) {  // Chỉ cho phép tiếp tục nếu đồng ý điều khoản
            setShowConfirm(true);
        } else if (!agree) {
            alert('Bạn cần đồng ý với Điều Khoản và Dịch Vụ trước khi tiếp tục.');
        }
    };

    const handleFinalSubmit = async () => {
        setShowConfirm(false);
        const createdDate = new Date();
        const currentTime = `${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`;
        
        const serviceTypeId = parseInt(serviceType);
        const phone = phoneNumber;
        const desc = description;
        const date = serviceType === '1' ? createdDate.toISOString().split('T')[0] : selectedDate;
        const time = serviceType === '1' ? currentTime : selectedTime;
        const address = (serviceType === '1' || serviceType === '3') ? null : detailedAddress;
        const zoneId = parseInt(!selectedDistrict || selectedDistrict === "" ? "0" : selectedDistrict);
        const doctorId = parseInt(!selectedDoctor || selectedDoctor === "dr0" ? "0" : selectedDoctor);

        const bookingData = {
            serviceTypeId,
            phone,
            description: desc,
            zoneId,
            address,
            doctorId,
            bookingDate: date,
            bookingTime: time
        };

        console.log(bookingData);

        try {
            const response = await postBookingData(bookingData);
            if (response.status === 200 || response.status === 201) {
                navigate("/homepage");
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };

    const handleSubmit = () => {
        let hasErrors = false;
        const newErrors = {
            phoneNumber: '',
            detailedAddress: '',
            selectedDate: '',
            selectedTime: '',
            selectedDistrict: ''
        };

        if (!phoneNumber) {
            newErrors.phoneNumber = 'Số điện thoại là bắt buộc';
            hasErrors = true;
        }

        if ((serviceType === '2' || serviceType === '4') && !detailedAddress) {
            newErrors.detailedAddress = 'Vui lòng nhập địa chỉ chi tiết cho dịch vụ tại nhà';
            newErrors.selectedDistrict = 'Vui lòng chọn quận';
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
        setSelectedDoctor,
        availableTimes,
        dateOptions,
        errors,
        handleDoctorSelect,
        handleConfirm,
        handleFinalSubmit,
        handleSubmit,
        showConfirm,
        setShowConfirm,
        agree,
        setAgree,  // Trả về setAgree để quản lý checkbox
    };
}
