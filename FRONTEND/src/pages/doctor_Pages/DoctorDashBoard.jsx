import React, { useState, useMemo } from 'react';
import styles from './styles/DoctorDashBoard.module.css';
import { DoctorNavBar } from "../../components/Navbar.jsx";
import useDoctorAppointment from './hooks/useDoctorAppointment';
import moment from 'moment';

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

const EditProfileForm = ({ doctor, onClose }) => {
  const { updateDoctorInfo } = useDoctorAppointment();
  const [formData, setFormData] = useState({
    fullName: doctor.fullName || '',
    phone: doctor.phone || '',
    experience: doctor.experience ? Number(doctor.experience) : 0,
    specialty: doctor.specialty || '',
    qualification: doctor.qualification || '',
    description: doctor.description || '',
  });
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(doctor.ImageUrl);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experience' ? Number(value) || 0 : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra các trường bắt buộc
    if (!formData.fullName.trim()) {
      setError('Vui lòng nhập họ và tên');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Vui lòng nhập số điện thoại');
      return;
    }
    if (!formData.experience || formData.experience <= 0) {
      setError('Vui lòng nhập số năm kinh nghiệm hợp lệ');
      return;
    }
    if (!formData.specialty.trim()) {
      setError('Vui lòng nhập chuyên môn');
      return;
    }
    if (!formData.qualification.trim()) {
      setError('Vui lòng nhập bằng cấp');
      return;
    }
    if (!formData.description.trim()) {
      setError('Vui lòng nhập mô tả');
      return;
    }
    
    try {
      const dataToSend = {
        ...formData,
        experience: Number(formData.experience),
        imageFile: formData.imageFile
      };

      await updateDoctorInfo(dataToSend);
      onClose();
      window.location.reload();
    } catch (error) {
      setError('Đã có lỗi xảy ra khi cập nhật thông tin');
    }
  };

  return (
    <div className={styles.editFormOverlay}>
      <div className={styles.editForm}>
        <h2>Chỉnh sửa thông tin</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Ảnh đại diện:</label>
            <div className={styles.avatarUpload}>
              {previewImage ? (
                <img src={previewImage} alt="Preview" className={styles.avatarPreview} />
              ) : (
                <AvatarPlaceholder name={formData.fullName} className={styles.avatarPreview} />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Họ và tên:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Số điện thoại:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Kinh nghiệm (năm):</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Chuyên môn:</label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Bằng cấp:</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Mô tả:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              Lưu thay đổi
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ChangePasswordForm = ({ onClose }) => {
  const { changePassword } = useDoctorAppointment();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    try {
      await changePassword(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra khi đổi mật khẩu');
    }
  };

  return (
    <div className={styles.editFormOverlay}>
      <div className={styles.editForm}>
        <h2>Đổi mật khẩu</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Mật khẩu hiện tại:</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Mật khẩu mới:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Xác nhận mật khẩu mới:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              Xác nhận
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DoctorDashBoard = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);

  const { stats, loading, error, doctorInfo, feedbacks } = useDoctorAppointment();

  // Thay thế phần render thông tin bác sĩ
  const renderDoctorInfo = () => {
    if (!doctorInfo) return null;

    return (
      <div className={styles.profileSection}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarContainer}>
            {doctorInfo.imageUrl ? (
              <img src={doctorInfo.imageUrl} alt="Doctor avatar" className={styles.avatarCircle} />
            ) : (
              <AvatarPlaceholder 
                name={doctorInfo.fullName} 
                className={styles.avatarCircle} 
              />
            )}
          </div>
          <h2 className={styles.profileName}>{doctorInfo.fullName}</h2>
          <div className={styles.averageRating}>
            <span className={styles.stars}>{'⭐'.repeat(Math.floor(doctorInfo.rate || 0))}</span>
            <span className={styles.ratingNumber}>
              {doctorInfo.rate ? `(${Number(doctorInfo.rate).toFixed(1)})` : '(Chưa có đánh giá)'}
            </span>
          </div>
        </div>
        
        <div className={styles.profileContent}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Số điện thoại</div>
              <div className={styles.infoValue}>{doctorInfo.phone || 'Chưa cập nhật'}</div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Chuyên môn</div>
              <div className={styles.infoValue}>{doctorInfo.specialty || 'Chưa cập nhật'}</div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Kinh nghiệm</div>
              <div className={styles.infoValue}>{doctorInfo.experience ? `${doctorInfo.experience} năm` : 'Chưa cập nhật'}</div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Bằng cấp</div>
              <div className={styles.infoValue}>{doctorInfo.qualification || 'Chưa cập nhật'}</div>
            </div>
          </div>

          <div className={styles.description}>
            <h3 className={styles.descriptionTitle}>Mô tả</h3>
            <p className={styles.descriptionContent}>{doctorInfo.description || 'Chưa cập nhật mô tả'}</p>
          </div>

          {/* Thêm phần nút điều khiển */}
          <div className={styles.profileActions}>
            <button 
              className={styles.editButton}
              onClick={() => setShowEditForm(true)}
            >
              Chỉnh sửa thông tin
            </button>
            <button 
              className={styles.passwordButton}
              onClick={() => setShowPasswordForm(true)}
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Thay thế phần render feedback
  const renderFeedbacks = () => {
    return (
      <div className={styles.feedbackSection}>
        <h3 className={styles.feedbackTitle}>Đánh giá gần nhất</h3>
        <div className={styles.feedbackGrid}>
          {feedbacks.map((feedback, index) => (
            <div key={index} className={styles.feedbackCard}>
              <div className={styles.ratingContainer}>
                <span className={styles.rating}>{'⭐'.repeat(feedback.rating)}</span>
                <span className={styles.ratingText}>{feedback.rating}.0</span>
              </div>
              <p className={styles.comment}>{feedback.comment}</p>
              <div className={styles.feedbackInfo}>
                <span className={styles.customerName}>{feedback.username}</span>
                <span className={styles.feedbackDate}>
                  {moment(feedback.created_date).format('DD/MM/YYYY')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <DoctorNavBar />
      <div className={styles.dashboard}>
        {/* Phần tổng quan */}
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

        {/* Container cho thông tin bác sĩ và feedback */}
        <div className={styles.container}>
          {renderDoctorInfo()}
          {renderFeedbacks()}
        </div>
      </div>

      {showEditForm && doctorInfo && (
        <EditProfileForm
          doctor={doctorInfo}
          onClose={() => setShowEditForm(false)}
        />
      )}

      {showPasswordForm && (
        <ChangePasswordForm onClose={() => setShowPasswordForm(false)} />
      )}
    </>
  );
};

export default DoctorDashBoard;
