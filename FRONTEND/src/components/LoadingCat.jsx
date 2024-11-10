
import styles from '../styles/LoadingCat.module.css'; // Import file CSS Modules

const LoadingCat = () => {
    return (
        <div className={styles.LoadingCatContainer}>
            <div className={styles.LoadingCat}>
                <div className={styles.LoadingCatBody}></div>
                <div className={styles.LoadingCatHead}>
                    <div className={styles.LoadingCatFace}></div>
                </div>
                <div className={styles.LoadingCatFoot}>
                    <div className={styles.LoadingCatTummyEnd}></div>
                    <div className={styles.LoadingCatBottom}></div>
                    <div className={`${styles.LoadingCatLegs} ${styles.LoadingCatLegsLeft}`}></div>
                    <div className={`${styles.LoadingCatLegs} ${styles.LoadingCatLegsRight}`}></div>
                </div>
                <div className={`${styles.LoadingCatHands} ${styles.LoadingCatHandsLeft}`}></div>
                <div className={`${styles.LoadingCatHands} ${styles.LoadingCatHandsRight}`}></div>
            </div>
        </div>
    );
};

export default LoadingCat;
