import { useBookingPage } from "../../hooks/useBookingPage.js";
import { useDoctorList, useService, useDistrictList } from '../../hooks/useService.js';
import { ServiceTypeSelector, PhoneInput, DescriptionInput, DateSelector, TimeSelector, DistrictSelector, AgreementCheckbox } from '../../components/BookingCard.jsx';
import { DetailedAddressInput, DoctorSelector, SubmitButton, ConfirmationModal } from '../../components/BookingCard.jsx';
import styles from '../../styles/BookingPage.module.css';
import { useState } from "react";
import { CustomerNavBar } from "../../components/Navbar.jsx";  // Chuyển từ import CSS thường sang CSS module

function BookingPage() {
    const {
        serviceType,
        setFormData,
        phoneNumber,
        description,
        handleSubmit,
        selectedDate,
        selectedTime,
        detailedAddress,
        selectedDistrict,
        selectedDoctor,
        errors,
        availableTimes,
        dateOptions,
        handleFinalSubmit,
        agree,
        setAgree
    } = useBookingPage();

    const { services } = useService();
    const { districts } = useDistrictList();
    const { doctors } = useDoctorList();

    const [showConfirm, setShowConfirm] = useState(false);

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
                            setServiceType={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
                            service={services}
                        />
                        <PhoneInput
                            phoneNumber={phoneNumber}
                            setPhoneNumber={(value) => setFormData(prev => ({ ...prev, phoneNumber: value }))}
                            error={errors.phoneNumber}
                        />
                        <DescriptionInput
                            description={description}
                            setDescription={(value) => setFormData(prev => ({ ...prev, description: value }))}
                        />
                        <DistrictSelector
                            selectedDistrict={selectedDistrict}
                            setSelectedDistrict={(value) => setFormData(prev => ({ ...prev, selectedDistrict: value }))}
                            districts={districts}
                            error={errors.selectedDistrict}
                            disabled={serviceType !== '2' && serviceType !== '4'}
                        />
                        <DetailedAddressInput
                            detailedAddress={detailedAddress}
                            setDetailedAddress={(value) => setFormData(prev => ({ ...prev, detailedAddress: value }))}
                            error={errors.detailedAddress}
                            disabled={serviceType !== '2' && serviceType !== '4'}
                        />
                    </div>

                    <div className={styles.appointmentColumn}>
                        <DoctorSelector
                            selectedDoctor={selectedDoctor}
                            handleDoctorSelect={(value) => setFormData(prev => ({ ...prev, selectedDoctor: value }))}
                            doctors={doctors}
                            disabled={serviceType !== '3'}
                        />
                        <DateSelector
                            selectedDate={selectedDate}
                            setSelectedDate={(value) => setFormData(prev => ({ ...prev, selectedDate: value }))}
                            dateOptions={dateOptions}
                            error={errors.selectedDate}
                            disabled={serviceType === '1'}
                        />
                        <TimeSelector
                            selectedTime={selectedTime}
                            setSelectedTime={(value) => setFormData(prev => ({ ...prev, selectedTime: value }))}
                            availableTimes={availableTimes}
                            error={errors.selectedTime}
                            disabled={serviceType === '1'}
                        />

                        {/* Checkbox đồng ý điều khoản */}
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
