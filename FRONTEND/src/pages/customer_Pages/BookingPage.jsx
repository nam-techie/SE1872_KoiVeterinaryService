import { useBookingPage } from "../../hooks/useBookingPage.js";
import { useDoctorList, useService, useDistrictList } from '../../hooks/useService.js';
import { ServiceTypeSelector, PhoneInput, DescriptionInput, DateSelector, TimeSelector, DistrictSelector, AgreementCheckbox } from '../../components/BookingCard.jsx';
import { DetailedAddressInput, DoctorSelector, SubmitButton, ConfirmationModal } from '../../components/BookingCard.jsx';
import styles from '../../styles/BookingPage.module.css';
import { useState, useEffect } from "react";
import { CustomerNavBar } from "../../components/Navbar.jsx";  // CSS Module import

function BookingPage() {
    const {
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
        errors,
        availableTimes,
        dateOptions,
        handleSubmit,
        handleFinalSubmit,
        agree,
        setAgree
    } = useBookingPage();

    const { services } = useService();
    const { districts } = useDistrictList();
    const { doctors } = useDoctorList();

    const [showConfirm, setShowConfirm] = useState(false);

    // Reset các giá trị liên quan khi loại dịch vụ thay đổi
    useEffect(() => {
        // Khi chuyển dịch vụ, reset lại các giá trị nhập liên quan
        setSelectedDate('');
        setSelectedTime('');
        setDetailedAddress('');
        setSelectedDistrict('');
        setSelectedDoctor('dr0'); // Đặt lại bác sĩ được chọn nếu cần
    }, [serviceType]);

    const handlePreSubmit = (e) => {
        const hasErrors = handleSubmit(e);
        if (!hasErrors) {
            setShowConfirm(true);
        }
    };

    return (
        <>
            <CustomerNavBar />
            <div className={styles.appointmentForm}>
                <h1 className={styles.formTitle}>Đặt dịch vụ</h1>

                <div className={styles.appointmentColumnContainer}>
                    <div className={styles.appointmentColumn}>
                        <ServiceTypeSelector
                            serviceType={serviceType}
                            setServiceType={setServiceType}
                            service={services}
                        />
                        <PhoneInput
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            error={errors.phoneNumber}
                        />
                        <DescriptionInput
                            description={description}
                            setDescription={setDescription}
                        />
                        <DistrictSelector
                            selectedDistrict={selectedDistrict}
                            setSelectedDistrict={setSelectedDistrict}
                            districts={districts}
                            error={errors.selectedDistrict}
                            disabled={serviceType !== '2' && serviceType !== '4'}
                        />
                        <DetailedAddressInput
                            detailedAddress={detailedAddress}
                            setDetailedAddress={setDetailedAddress}
                            error={errors.detailedAddress}
                            disabled={serviceType !== '2' && serviceType !== '4'}
                        />
                    </div>

                    <div className={styles.appointmentColumn}>
                        <DoctorSelector
                            selectedDoctor={selectedDoctor}
                            handleDoctorSelect={setSelectedDoctor}
                            doctors={doctors}
                            disabled={serviceType !== '3'}
                        />
                        <DateSelector
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            dateOptions={dateOptions}
                            error={errors.selectedDate}
                            disabled={serviceType === '1'}
                        />
                        <TimeSelector
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                            availableTimes={availableTimes}
                            error={errors.selectedTime}
                            disabled={serviceType === '1'}
                        />

                        {/* Hộp kiểm Đồng ý điều khoản */}
                        <AgreementCheckbox setAgree={setAgree} />

                        <SubmitButton handleSubmit={handlePreSubmit} isDisabled={!agree} />
                    </div>
                </div>

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
                        serviceTypeMap={services}
                        districtsMap={districts}
                        doctorMap={doctors}
                    />
                )}
            </div>
        </>
    );
}

export default BookingPage;
