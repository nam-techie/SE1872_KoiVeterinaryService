// useService.js
import { useState, useEffect } from 'react';
import {getDistrict, ServiceList, ServiceBookingData} from "../services/apiService.js"
import {VeterianList, VeterianScheduleHome} from "../services/apiVeterian.js";


export const useServiceBookingData = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Bắt đầu fetch dữ liệu từ /serviceBooking.json');

        const getData = async () => {
            try {
                const data = await ServiceBookingData();
                setServices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    return { services, loading, error };
};

export const useVeterianList = () => {
    const [doctors, setDoctors] = useState([]);
    const [doctorLoading, setDoctorLoading] = useState(true);
    const [doctorError, setDoctorError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setDoctorLoading(true);
                const data = await VeterianList(); // Gọi hàm VeterianList để lấy dữ liệu
                setDoctors(data); // Đặt dữ liệu vào state
            } catch (err) {
                setDoctorError("Đã xảy ra lỗi khi lấy dữ liệu bác sĩ.");
                console.error(err);
            } finally {
                setDoctorLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    return { doctors, doctorLoading, doctorError };
};

export const useDistrictList = () => {
    const [districts, setDistricts] = useState([]);
    const [districtsLoading, setDistrictsLoading] = useState(true);
    const [districtsError, setDistrictsError] = useState(null);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                setDistrictsLoading(true);
                const data = await getDistrict(); // Gọi API để lấy danh sách quận/huyện
                setDistricts(data); // Lưu danh sách vào state
            } catch (err) {
                setDistrictsError("Đã xảy ra lỗi khi lấy dữ liệu quận/huyện.");
                console.error(err);
            } finally {
                setDistrictsLoading(false);
            }
        };

        fetchDistricts();
    }, []);

    return { districts, districtsLoading, districtsError };
};

export const useService = () =>{
    const[service,setService] = useState([]);
    const [serviceLoading, setServiceLoading] = useState(true);
    const [serviceError, setServiceError] = useState(null);
    useEffect(() => {
        const fetchService = async () =>{
            try{
                setServiceLoading(true);
                const data = await ServiceList();
                setService(data);
            } catch (err){
                setServiceError("Lỗi khi lấy dữ liệu dịch vụ");
                console.error(err);
            } finally {
                setServiceLoading(false);
            }
        }
       fetchService();
    }, []);

    return{service,serviceLoading,serviceError};

};
export const useVeterianScheduleHome =() => {
    const [veterianScheduleHome, setveterianScheduleHome] = useState('');
    const [veterianScheduleHomeLoading, setveterianScheduleHomeLoading] = useState(true);
    const [veterianScheduleHomeError, setveterianScheduleHomeError] = useState(null);

    useEffect(() => {
        const fetchHomeSchedule = async () =>{
            try{
                setveterianScheduleHomeLoading(true);
                const data = await VeterianScheduleHome;
                setveterianScheduleHome(data);
            } catch (err){
                setveterianScheduleHomeError("Lỗi khi lấy dữ liệu dịch vụ");
                console.error(err);
            } finally {
                setveterianScheduleHomeLoading(false);
            }
        }
        fetchHomeSchedule();
    }, []);

    return{veterianScheduleHome,veterianScheduleHomeLoading,veterianScheduleHomeError};

}


