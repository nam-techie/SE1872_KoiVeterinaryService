import styles from "../styles/HomePage.module.css"


// eslint-disable-next-line react/prop-types
export function DoctorCard({ fullname, sex, phone, experience, profilePic }) {
    return (
        <div className={styles.doctorCard}>
            <img src={profilePic} alt={fullname} className={styles.doctorImage} />
            <div className={styles.doctorInf}>
                <h3 className={styles.doctorName}>{fullname}</h3>
                <p className={styles.doctorDetail}><strong>Giới tính:</strong> {sex ? "Nam" : "Nữ"}</p>
                <p className={styles.doctorDetail}><strong>Số điện thoại:</strong> {phone}</p>
                <p className={styles.doctorDetail}><strong>Kinh nghiệm:</strong> {experience} năm</p>
            </div>
        </div>
    );
}