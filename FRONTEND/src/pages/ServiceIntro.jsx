import { CustomerNavBar } from "../components/Navbar.jsx";
import styles from "../styles/ServiceIntro.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { TbStethoscope } from "react-icons/tb";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";
import Slider from "react-slick";

// Import CSS của Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ServiceIntro() {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <CustomerNavBar />
            <div className={styles.serviceIntroContainer}>
                <div className={styles.breadCrumb}>
                    <a href="/homepage">Trang Chủ</a>
                    <IoIosArrowForward size={22} color={"orange"} />
                    <span>Về KOI CUNG</span>
                </div>

                <div className={styles.serviceIntroFist}>
                    <h1>Dịch Vụ</h1>
                    <div className={styles.orangeLine}></div>
                </div>

                <div className={styles.serviceIntroSecond}>
                    <Slider {...sliderSettings}>
                        <div className={styles.serviceIntroSecondCard}>
                            <BsFillTelephoneInboundFill size={35} color="orange" />
                            <h4>Dịch Vụ Tư Vấn Trực Tuyến</h4>
                            <button className={styles.scheduleButton}>Đặt lịch ngay</button>
                        </div>

                        <div className={styles.serviceIntroSecondCard}>
                            <TbStethoscope size={35} color="orange" />
                            <h4>Dịch Vụ Điều Trị Bệnh Tại Nhà</h4>
                            <button className={styles.scheduleButton}>Đặt lịch ngay</button>
                        </div>

                        <div className={styles.serviceIntroSecondCard}>
                            <FaBriefcaseMedical size={35} color="orange" />
                            <h4>Tìm Bác Sĩ</h4>
                            <button className={styles.scheduleButton}>Đặt lịch ngay</button>
                        </div>

                        <div className={styles.serviceIntroSecondCard}>
                            <FaHospital size={35} color="orange" />
                            <h4>Điều Trị Tại Trung Tâm</h4>
                            <button className={styles.scheduleButton}>Đặt lịch ngay</button>
                        </div>
                    </Slider>
                </div>
                <div className={styles.serviceIntroThird}>
                    <h1>Thông Tin Chi Tiết Dịch Vụ</h1>
                    <div className={styles.orangeLine}></div>
                </div>
            </div>
        </>
    );
}

export default ServiceIntro;
