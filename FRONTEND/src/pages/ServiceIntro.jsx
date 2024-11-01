import { CustomerNavBar } from "../components/Navbar.jsx";
import styles from "../styles/ServiceIntro.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { TbStethoscope } from "react-icons/tb";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";
import Slider from "react-slick";
import Footer from "../components/Footer.jsx";
// Import CSS của Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContactButton from "../components/ContactButton.jsx";
import { useService } from "../hooks/useService.js";

function ServiceIntro() {
    const { services } = useService();

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
                    <h1>Dịch Vụ Của Trung Tâm Chúng Tôi</h1>
                    <div className={styles.orangeLine}></div>
                </div>

                <div className={styles.serviceIntroSecond}>
                    <Slider {...sliderSettings}>
                        <div className={styles.serviceIntroSecondCard}>
                            <BsFillTelephoneInboundFill size={35} color="orange" />
                            <h4>Dịch Vụ Tư Vấn Trực Tuyến</h4>
                            <a href="/customer/booking-page" className={styles.scheduleButton}>
                                Đặt lịch ngay
                            </a>
                        </div>

                        <div className={styles.serviceIntroSecondCard}>
                            <TbStethoscope size={35} color="orange" />
                            <h4>Dịch Vụ Điều Trị Bệnh Tại Nhà</h4>
                            <a href="/customer/booking-page" className={styles.scheduleButton}>
                                Đặt lịch ngay
                            </a>
                        </div>

                        <div className={styles.serviceIntroSecondCard}>
                            <FaBriefcaseMedical size={35} color="orange" />
                            <h4>Tìm Bác Sĩ</h4>
                            <a href="/customer/booking-page" className={styles.scheduleButton}>
                                Đặt lịch ngay
                            </a>
                        </div>

                        <div className={styles.serviceIntroSecondCard}>
                            <FaHospital size={35} color="orange" />
                            <h4>Điều Trị Tại Trung Tâm</h4>
                            <a href="/customer/booking-page" className={styles.scheduleButton}>
                                Đặt lịch ngay
                            </a>
                        </div>
                    </Slider>
                </div>

                {/* Detailed Service Information Section */}
                <div className={styles.serviceIntroThird}>
                    <h1>Thông Tin Chi Tiết Dịch Vụ</h1>
                    <div className={styles.orangeLine}></div>

                    <div className={styles.serviceDetailsGrid}>
                        {/* First service detail */}
                        <div className={styles.serviceCard}>
                            <BsFillTelephoneInboundFill size={40} color="orange" />
                            <h3>Dịch Vụ Tư Vấn Trực Tuyến</h3>
                            <p>
                                Nhận tư vấn y tế trực tuyến từ các bác sĩ chuyên khoa. Dịch vụ tư vấn qua điện thoại
                                hoặc video call giúp bạn nhận được sự chăm sóc và hướng dẫn từ bác sĩ một cách nhanh
                                chóng mà không cần phải di chuyển.
                            </p>
                        </div>

                        {/* Second service detail */}
                        <div className={styles.serviceCard}>
                            <TbStethoscope size={40} color="orange" />
                            <h3>Dịch Vụ Điều Trị Bệnh Tại Nhà</h3>
                            <p>
                                Bác sĩ sẽ đến nhà để thăm khám và điều trị cho bạn ngay tại nơi ở. Dịch vụ này dành cho
                                những bệnh nhân cần chăm sóc y tế nhưng không thể di chuyển tới bệnh viện.
                            </p>
                        </div>

                        {/* Third service detail */}
                        <div className={styles.serviceCard}>
                            <FaBriefcaseMedical size={40} color="orange" />
                            <h3>Dịch vụ khảo sát hồ Cá Tại Nhà</h3>
                            <p>
                                Hỗ trợ tìm kiếm bác sĩ chuyên khoa phù hợp với nhu cầu điều trị của bạn. Chúng tôi cung
                                cấp danh sách các bác sĩ giỏi và được chứng nhận, đảm bảo chất lượng khám chữa bệnh.
                            </p>
                        </div>

                        {/* Fourth service detail */}
                        <div className={styles.serviceCard}>
                            <FaHospital size={40} color="orange" />
                            <h3>Điều Trị Tại Trung Tâm</h3>
                            <p>
                                Nhận điều trị chuyên sâu tại các trung tâm y tế của chúng tôi. Với cơ sở vật chất hiện
                                đại và đội ngũ bác sĩ chuyên môn cao, bạn sẽ được chăm sóc y tế toàn diện.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bảng Giá Dịch Vụ */}
                <div className={styles.serviceIntroFourth}>
                    <h1>Bảng Giá Dịch Vụ</h1>
                    <div className={styles.orangeLine}></div>

                    {/* Kiểm tra nếu có dịch vụ */}
                    {services.length > 0 ? (
                        <table className={styles.serviceTable}>
                            <thead>
                            <tr>
                                <th>Tên Dịch Vụ</th>
                                <th>Giá Cả (VND)</th>
                                <th>Mô Tả</th>
                            </tr>
                            </thead>
                            <tbody>
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td>{service.name}</td>
                                    <td>{service.base_price.toLocaleString()}</td>
                                    <td>{service.description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Không có dịch vụ nào để hiển thị.</p>
                    )}
                </div>
            </div>

            <ContactButton />
            <Footer />
        </>
    );
}

export default ServiceIntro;
