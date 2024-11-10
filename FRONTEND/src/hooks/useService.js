import {useState, useEffect} from "react";
import {getServiceList,getDistrictList, getSupportServiceList, getZonePriceList} from "../service/apiService.js";
import {getDoctorList} from "../service/apiDoctor.js";

export const useService = () =>{
    const [services, setServices] = useState([]);
    const [supportServices, setSupportServices] = useState([]);
    const [zonePrices, setZonePrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mainServices, supportData, zoneData] = await Promise.all([
                    getServiceList(),
                    getSupportServiceList(),
                    getZonePriceList()
                ]);
                setServices(mainServices);
                setSupportServices(supportData);
                setZonePrices(zoneData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { services, supportServices, zonePrices, loading, error };
}

export const useDistrictList = () => {
    const [districts, setDistricts] = useState([]);
    const [districtsLoading, setDistrictsLoading] = useState(true);
    const [districtsError, setDistrictsError] = useState(null);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                setDistrictsLoading(true);
                const data = await getDistrictList();
                setDistricts(data);

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

export function useDoctorList() {
    const [doctors, setDoctors] = useState([]);  // Khởi tạo là mảng rỗng
    const [doctorLoading, setDoctorLoading] = useState(true);
    const [doctorError, setDoctorError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setDoctorLoading(true);
                const data = await  getDoctorList();
                setDoctors(data);
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
}

export const usePriceTables = () => {
    const [mainServices, setMainServices] = useState([]);
    const [supportServices, setSupportServices] = useState([]);
    const [zonePrices, setZonePrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                setLoading(true);
                // Dùng getServiceList cho dịch vụ chính vì nó đã có sẵn
                const [mainData, supportData, zoneData] = await Promise.all([
                    getServiceList(),
                    getSupportServiceList(),
                    getZonePriceList()
                ]);
                setMainServices(mainData);
                setSupportServices(supportData);
                setZonePrices(zoneData);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching price data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    return { mainServices, supportServices, zonePrices, loading, error };
};
