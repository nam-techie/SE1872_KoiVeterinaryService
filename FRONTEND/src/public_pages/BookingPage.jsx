import { useState } from 'react';
import useBookingPage from '../hooks/useBookingPage.js';
import { useDistrictList, useService, useVeterianList } from '../hooks/useService.js';
import { ServiceTypeSelector, PhoneInput, DescriptionInput, DateSelector, TimeSelector, DistrictSelector } from './BookingPageDetail.jsx';
import { DetailedAddressInput, DoctorSelector, SubmitButton, ConfirmationModal } from './BookingPageDetail.jsx';
import '../styles/BookingPage.css';

export function BookingPage() {
    const {
        serviceType,
        setServiceType,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        handleSubmit,   // Hàm này sẽ kiểm tra lỗi trước khi hiển thị modal
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        detailedAddress,
        setDetailedAddress,
        selectedDistrict,
        setSelectedDistrict,
        errors,  // Lỗi đã được truyền từ useBookingPage
        selectedDoctor,
        availableTimes,
        dateOptions,
        handleDoctorSelect,
        handleFinalSubmit,
    } = useBookingPage();

    const { service, serviceLoading, serviceError } = useService();
    const { districts, districtsError, districtsLoading } = useDistrictList();
    const { doctors, doctorLoading, doctorError } = useVeterianList();

    const [showConfirm, setShowConfirm] = useState(false);

    // Hàm xử lý khi nhấn submit
    const handlePreSubmit = (e) => {
        const hasErrors = handleSubmit(e); // Kiểm tra lỗi trước khi hiển thị modal
        if (!hasErrors) {
            setShowConfirm(true); // Nếu không có lỗi, hiển thị modal xác nhận
        }
    };

    return (
        <div className="appointment-form">
            <h1>Đặt dịch vụ</h1>

            {serviceLoading && <p>Đang tải danh sách dịch vụ...</p>}
            {serviceError && <p>{serviceError}</p>}
            <ServiceTypeSelector serviceType={serviceType} setServiceType={setServiceType} service={service} />

            {(serviceType) && (
                <>
                    <PhoneInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} error={errors.phoneNumber} />
                    <DescriptionInput description={description} setDescription={setDescription} />
                </>
            )}

            {(serviceType === '2' || serviceType === '4') && (
                <>
                    <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateOptions={dateOptions} error={errors.selectedDate}/>
                    <TimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} availableTimes={availableTimes} error={errors.selectedTime} />

                    {!districtsLoading && !districtsError && (
                        <DistrictSelector selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} districts={districts} error={errors.selectedDistrict}/>
                    )}
                    <DetailedAddressInput detailedAddress={detailedAddress} setDetailedAddress={setDetailedAddress} error={errors.detailedAddress} />
                </>
            )}

            {serviceType === '3' && (
                <>
                    {!doctorLoading && !doctorError && (
                        <DoctorSelector
                            selectedDoctor={selectedDoctor}
                            handleDoctorSelect={handleDoctorSelect}
                            doctors={doctors}
                        />
                    )}
                    <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateOptions={dateOptions} error={errors.selectedDate}/>
                    <TimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} availableTimes={availableTimes} error={errors.selectedTime} />
                </>
            )}

            {/* Hiển thị modal xác nhận nếu không có lỗi */}
            {showConfirm && (
                <ConfirmationModal
                    serviceType={serviceType}
                    phoneNumber={phoneNumber}
                    description={description}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    selectedDistrict={selectedDistrict}
                    detailedAddress={detailedAddress}
                    selectedDoctor={selectedDoctor}
                    handleFinalSubmit={handleFinalSubmit}
                    setShowConfirm={setShowConfirm}
                    serviceTypeMap={service}
                    districtsMap={districts}
                    doctorMap={doctors}
                />
            )}

            {!showConfirm && <SubmitButton handleSubmit={handlePreSubmit} />}  {/* Kiểm tra lỗi trước khi hiển thị modal */}
        </div>
    );
}

export default BookingPage;
