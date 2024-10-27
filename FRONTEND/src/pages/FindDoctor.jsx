import React, {useState} from 'react';
import {CustomerNavBar} from '../components/Navbar';
import styles from '../styles/FindDoctor.module.css';

const doctorsData = [
    {
        id: 1,
        name: "Dr. Nguyễn Văn A",
        specialty: "Nội khoa",
        experience: "10 năm",
        description: "Bác sĩ Nguyễn Văn A có hơn 10 năm kinh nghiệm trong lĩnh vực Nội khoa. Chuyên điều trị các bệnh về tim mạch và hô hấp."
    },
    {
        id: 2,
        name: "Dr. Trần Thị B",
        specialty: "Da liễu",
        experience: "8 năm",
        description: "Bác sĩ Trần Thị B là chuyên gia trong lĩnh vực Da liễu với 8 năm kinh nghiệm. Chuyên điều trị các bệnh về da và thẩm mỹ."
    },
    {
        id: 3,
        name: "Dr. Lê Văn C",
        specialty: "Tim mạch",
        experience: "15 năm",
        description: "Bác sĩ Lê Văn C có 15 năm kinh nghiệm trong lĩnh vực Tim mạch. Chuyên điều trị các bệnh về tim và mạch máu."
    },
    {
        id: 4,
        name: "Dr. Phạm Thị D",
        specialty: "Nhi khoa",
        experience: "12 năm",
        description: "Bác sĩ Phạm Thị D là chuyên gia Nhi khoa với 12 năm kinh nghiệm. Chuyên điều trị các bệnh ở trẻ em và chăm sóc sức khỏe trẻ em."
    },
    {
        id: 5,
        name: "Dr. Hoàng Văn E",
        specialty: "Thần kinh",
        experience: "20 năm",
        description: "Bác sĩ Hoàng Văn E có 20 năm kinh nghiệm trong lĩnh vực Thần kinh. Chuyên điều trị các bệnh về não và hệ thần kinh."
    },
];

function FindDoctor() {
    const [searchTerm, setSearchTerm] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [experience, setExperience] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const filteredDoctors = doctorsData.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (specialty === '' || doctor.specialty === specialty) &&
        (experience === '' || parseInt(doctor.experience) >= parseInt(experience))
    );

    const handleDoctorClick = (doctor) => {
        setSelectedDoctor(doctor);
    };

    return (
        <div>
            <CustomerNavBar/>
            <div className={styles.findDoctorContainer}>
                <h1>Tìm Bác sĩ</h1>
                <div className={styles.filterContainer}>
                    <select
                        className={styles.filterSelect}
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    >
                        <option value="">Yêu cầu chuyên môn</option>
                        <option value="Nội khoa">Nội khoa</option>
                        <option value="Da liễu">Da liễu</option>
                        <option value="Tim mạch">Tim mạch</option>
                        <option value="Nhi khoa">Nhi khoa</option>
                        <option value="Thần kinh">Thần kinh</option>
                    </select>
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
                    <input
                        type="text"
                        placeholder="Nhập tên bác sĩ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button className={styles.searchButton}>Tìm bác sĩ</button>
                </div>
                <h2>Danh sách Bác sĩ</h2>
                <div className={styles.doctorGrid}>
                    {filteredDoctors.map(doctor => (
                        <div key={doctor.id} className={styles.doctorCard}>
                            <div className={styles.avatarContainer}>
                                <div className={styles.avatar}>
                                    {doctor.name.split(' ').pop().charAt(0)}
                                </div>
                            </div>
                            <h3 className={styles.doctorName}>{doctor.name}</h3>
                            <p className={styles.doctorSpecialty}>{doctor.specialty}</p>
                            <p className={styles.doctorExperience}>{doctor.experience} kinh nghiệm</p>
                            <button className={styles.detailButton} onClick={() => handleDoctorClick(doctor)}>Xem chi
                                tiết
                            </button>
                        </div>
                    ))}
                </div>
                {selectedDoctor && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2>{selectedDoctor.name}</h2>
                            <p><strong>Chuyên khoa:</strong> {selectedDoctor.specialty}</p>
                            <p><strong>Kinh nghiệm:</strong> {selectedDoctor.experience}</p>
                            <p>{selectedDoctor.description}</p>
                            <button onClick={() => setSelectedDoctor(null)}>Đóng</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FindDoctor;
