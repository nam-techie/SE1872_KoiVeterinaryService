import React, { useState, useMemo } from 'react';
import styles from './styles/DoctorDashBoard.module.css';
import { DoctorNavBar } from "../../components/Navbar.jsx";
import useDoctorAppointment from './hooks/useDoctorAppointment';

// Mock Data
const mockDoctor = {
  name: "Dr. Nguyễn Văn A",
  gender: "Nam",
  phone: "0123456789",
  experience: "10 năm",
  avatar: "https://example.com/default-avatar.jpg"
};

// Thêm hàm tạo avatar từ tên
const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Tạo component AvatarPlaceholder
const AvatarPlaceholder = ({ name, className }) => {
  // Tạo màu ngẫu nhiên nhưng ổn định cho mỗi tên
  const backgroundColor = useMemo(() => {
    const colors = ['#FF6B4A', '#4A90E2', '#50C878', '#9B59B6', '#F1C40F'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }, [name]);

  return (
    <div 
      className={className}
      style={{
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: 'bold'
      }}
    >
      {getInitials(name)}
    </div>
  );
};

const DoctorDashBoard = () => {
  const [doctor, setDoctor] = useState(mockDoctor);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);

  const { stats, loading, error } = useDoctorAppointment();

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Handle edit profile logic here
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Handle password change logic here
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(URL.createObjectURL(file));
    }
  };

  // Cập nhật phần render avatar trong profileCard
  const renderAvatar = () => {
    if (newAvatar) {
      return <img src={newAvatar} alt="Doctor avatar" className={styles.avatar} />;
    }
    if (doctor.avatar && doctor.avatar !== "https://example.com/default-avatar.jpg") {
      return <img src={doctor.avatar} alt="Doctor avatar" className={styles.avatar} />;
    }
    return <AvatarPlaceholder name={doctor.name} className={styles.avatar} />;
  };

  return (
    <>
      <DoctorNavBar/>
      <div className={styles.dashboard}>
        {/* Phần thống kê */}
        <div className={styles.statsSection}>
          <h2>Tổng quan hôm nay</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statsCard}>
              <div className={styles.statsIcon}>📅</div>
              <h3>Tổng số lịch hẹn</h3>
              <p className={styles.statsNumber}>{stats.totalAppointments}</p>
            </div>
            
            <div className={styles.statsCard}>
              <div className={styles.statsIcon}>❌</div>
              <h3>Lịch hẹn đã hủy</h3>
              <p className={styles.statsNumber}>{stats.cancelledAppointments}</p>
            </div>
            
            <div className={styles.statsCard}>
              <div className={styles.statsIcon}>✅</div>
              <h3>Lịch hẹn hoàn thành</h3>
              <p className={styles.statsNumber}>{stats.doneAppointments}</p>
            </div>
            
            <div className={styles.statsCard}>
              <div className={styles.statsIcon}>⏳</div>
              <h3>Lịch hẹn chờ xử lý</h3>
              <p className={styles.statsNumber}>{stats.waitAppointments}</p>
            </div>
          </div>
        </div>

        {/* Phần thông tin bác sĩ */}
        <div className={styles.profileSection}>
          <div className={styles.profileCard}>
            {renderAvatar()}
            <div className={styles.profileInfo}>
              <h2>{doctor.name}</h2>
              <p>Giới tính: {doctor.gender}</p>
              <p>Số điện thoại: {doctor.phone}</p>
              <p>Kinh nghiệm: {doctor.experience}</p>
              <div className={styles.buttonGroup}>
                <button onClick={() => setShowEditForm(true)}>Chỉnh sửa thông tin</button>
                <button onClick={() => setShowPasswordForm(true)}>Đổi mật khẩu</button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        {showEditForm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3>Chỉnh sửa thông tin</h3>
              <form onSubmit={handleEditSubmit}>
                <div className={styles.formGroup}>
                  <label>Họ và tên:</label>
                  <input type="text" defaultValue={doctor.name} />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Giới tính:</label>
                  <select defaultValue={doctor.gender}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Số điện thoại:</label>
                  <input type="tel" defaultValue={doctor.phone} />
                </div>

                <div className={styles.formGroup}>
                  <label>Kinh nghiệm:</label>
                  <input type="text" defaultValue={doctor.experience} />
                </div>

                <div className={styles.formGroup}>
                  <label>Ảnh đại diện:</label>
                  <input type="file" onChange={handleAvatarChange} accept="image/*" />
                </div>

                <div className={styles.modalButtons}>
                  <button type="submit" className={styles.saveButton}>Lưu</button>
                  <button type="button" className={styles.cancelButton} onClick={() => setShowEditForm(false)}>Hủy</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Change Password Form */}
        {showPasswordForm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3>Đổi mật khẩu</h3>
              <form onSubmit={handlePasswordChange}>
                <div className={styles.formGroup}>
                  <label>Mật khẩu hiện tại:</label>
                  <input type="password" />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Mật khẩu mới:</label>
                  <input type="password" />
                </div>

                <div className={styles.formGroup}>
                  <label>Xác nhận mật khẩu mới:</label>
                  <input type="password" />
                </div>

                <div className={styles.modalButtons}>
                  <button type="submit" className={styles.saveButton}>Lưu</button>
                  <button type="button" className={styles.cancelButton} onClick={() => setShowPasswordForm(false)}>Hủy</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorDashBoard;
