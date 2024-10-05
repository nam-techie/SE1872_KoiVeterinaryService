import { useState } from "react";

export const useBookingForm = () => {
    const [specialty, setSpecialty] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('Ho Chi Minh'); // Mặc định là Sài Gòn
    const [doctor, setDoctor] = useState(''); // Dành cho lịch khám tại trung tâm

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic xử lý submit form
        console.log({
            specialty,
            phoneNumber,
            description,
            address,
            district,
            doctor
        });
    };

    return {
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
        handleSubmit
    };
};
