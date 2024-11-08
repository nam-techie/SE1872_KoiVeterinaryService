import styles from "../styles/HomePage.module.css";

// eslint-disable-next-line react/prop-types
export const DoctorCard = ({
  fullname,
  experience,
  profilePic,
  qualification,
  rating,
}) => {
  return (
    <div className={styles.doctorCard}>
      <div className={styles.doctorImageContainer}>
        <img
          src={profilePic}
          alt={fullname}
          className={styles.doctorImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              fullname
            )}&background=random`;
          }}
        />
      </div>
      <h3>{fullname}</h3>
      <p>Kinh nghiệm: {experience} năm</p>
      <p>Bằng cấp: {qualification}</p>
      {rating && rating !== "NaN" && <p>Đánh giá: {rating} ⭐</p>}
    </div>
  );
};
