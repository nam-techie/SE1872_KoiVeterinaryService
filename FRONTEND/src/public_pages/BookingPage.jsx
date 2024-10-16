import useBookingPage from '../hooks/useBookingPage.js';
import {useDistrictList, useService, useVeterianList} from '../hooks/useService.js';
import {
    ServiceTypeSelector,
    PhoneInput,
    DescriptionInput,
    DateSelector,
    TimeSelector,
    DistrictSelector
} from "./BookingPageDetail.jsx";
import {DetailedAddressInput, DoctorSelector, SubmitButton} from "./BookingPageDetail.jsx";
import '../styles/BookingPage.css';

export function BookingPage() {
    const {
        serviceType,
        setServiceType,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        handleSubmit,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        detailedAddress,
        setDetailedAddress,
        selectedDistrict,
        setSelectedDistrict,
        selectedDoctor,
        availableTimes,
        dateOptions,
        handleDoctorSelect,
    } = useBookingPage();

    const {service, serviceLoading, serviceError} = useService();
    const {districts, districtsError, districtsLoading} = useDistrictList();
    const {doctors, doctorLoading, doctorError} = useVeterianList();

    return (
        <div className="appointment-form">
            <h1>Đặt dịch vụ</h1>

            {serviceLoading && <p>Đang tải danh sách dịch vụ...</p>}
            {serviceError && <p>{serviceError}</p>}

            <ServiceTypeSelector serviceType={serviceType} setServiceType={setServiceType} service={service}/>
            {(serviceType !== '') && (
                <>
                    <PhoneInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>
                    <DescriptionInput description={description} setDescription={setDescription}/>

                    {(serviceType === '2' || serviceType === '4') && (
                        <>
                            <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                                          dateOptions={dateOptions}/>
                            <TimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime}
                                          availableTimes={availableTimes}/>
                            {!districtsLoading && !districtsError && (
                                <DistrictSelector
                                    selectedDistrict={selectedDistrict}
                                    setSelectedDistrict={setSelectedDistrict}
                                    districts={districts}
                                />
                            )}
                            <DetailedAddressInput detailedAddress={detailedAddress}
                                                  setDetailedAddress={setDetailedAddress}/>
                        </>
                    )}

                    {serviceType === '3' && (
                        <>
                            {!doctorLoading && !doctorError && (
                                <>
                                    <DoctorSelector
                                        selectedDoctor={selectedDoctor}
                                        handleDoctorSelect={handleDoctorSelect}
                                        doctors={doctors}
                                    />
                                </>
                            )}
                            <DateSelector
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                dateOptions={dateOptions}
                            />
                            <TimeSelector
                                selectedTime={selectedTime}
                                setSelectedTime={setSelectedTime}
                                availableTimes={availableTimes}
                            />
                        </>
                    )}

                </>
            )}


            <SubmitButton handleSubmit={handleSubmit}/>
        </div>
    );
}

export default BookingPage;
