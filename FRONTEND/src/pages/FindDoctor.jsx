import React, {useState, useEffect} from 'react';
import {CustomerNavBar} from '../components/Navbar';
import styles from '../styles/FindDoctor.module.css';
import { getDoctorList, getDoctorDetail } from '../service/apiDoctor';

function FindDoctor() {
    const [searchTerm, setSearchTerm] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [experience, setExperience] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const doctorData = await getDoctorList();
            setDoctors(doctorData);
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doctor =>
        (doctor?.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) &&
        (specialty === '' || doctor?.doctorInfo?.specialty === specialty) &&
        (experience === '' || doctor?.experience >= parseInt(experience))
    );

    const handleDoctorClick = async (doctor) => {
        try {
            const doctorDetails = await getDoctorDetail(doctor.id);
            if (doctorDetails) {
                setSelectedDoctor(doctorDetails);
            } else {
                console.error('Không thể lấy thông tin chi tiết bác sĩ');
            }
        } catch (error) {
            console.error('Lỗi khi xử lý thông tin chi tiết bác sĩ:', error);
        }
    };

    return (
        <div>
            <CustomerNavBar/>
            <div className={styles.findDoctorContainer}>
                <h1>Tìm Bác sĩ</h1>
                <div className={styles.searchContainer}>
                    <div className={styles.searchItem}>
                        <select
                            className={styles.filterSelect}
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        >
                            <option value="">Kinh nghiệm</option>
                            <option value="5">5 năm trở lên</option>
                            <option value="10">10 năm trở lên</option>
                            <option value="15">15 năm trở lên</option>
                        </select>
                    </div>
                    <div className={styles.searchItem}>
                        <input
                            type="text"
                            placeholder="Nhập tên bác sĩ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </div>
                <h2>Danh sách Bác sĩ</h2>
                <div className={styles.doctorGrid}>
                    {filteredDoctors.map(doctor => (
                        <div key={doctor.id} className={styles.doctorCard}>
                            <div className={styles.doctorImageContainer}>
                                {doctor.imageUrl ? (
                                    <img 
                                        src={doctor.imageUrl} 
                                        alt={doctor.fullName} 
                                        className={styles.doctorImage}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.fullName)}&background=random`;
                                        }}
                                    />
                                ) : (
                                    <img 
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.fullName)}&background=random`}
                                        alt={doctor.fullName} 
                                        className={styles.doctorImage}
                                    />
                                )}
                            </div>
                            <h3 className={styles.doctorName}>{doctor.fullName}</h3>
                            <p className={styles.doctorPhone}>SĐT: {doctor.phone}</p>
                            <p className={styles.doctorExperience}>Kinh nghiệm: {doctor.experience} năm</p>
                            <button className={styles.detailButton} onClick={() => handleDoctorClick(doctor)}>Xem chi tiết</button>
                        </div>
                    ))}
                </div>
                {selectedDoctor && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2>{selectedDoctor.fullName}</h2>
                            <p><strong>Số điện thoại:</strong> {selectedDoctor.phone}</p>
                            <p><strong>Kinh nghiệm:</strong> {selectedDoctor.experience} năm</p>
                            <p><strong>Chuyên khoa:</strong> {selectedDoctor.specialty}</p>
                            <p><strong>Mô tả:</strong> {selectedDoctor.description}</p>
                            <p><strong>Bằng cấp:</strong> {selectedDoctor.qualification}</p>
                            <button onClick={() => setSelectedDoctor(null)}>Đóng</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FindDoctor;
