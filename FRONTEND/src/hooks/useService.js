import {useState, useEffect} from "react";
import {getServiceList,getDistrictList} from "../service/apiService.js";
import {getDoctorList} from "../service/apiDoctor.js";

export const useService = () =>{
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getService = async () => {
            try {
                const data = await getServiceList();
                setServices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getService();
    }, []);

    return { services, loading, error };
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
                console.log(data)
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

export const useDoctorList = () => {
    const [doctors, setDoctors] = useState([]);
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
};
