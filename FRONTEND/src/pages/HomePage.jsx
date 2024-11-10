import {CustomerNavBar} from "../components/Navbar";
import styles from "../styles/HomePage.module.css";
import homePageFirst1st from "../assets/homePage_images/homePageFish1St.jpg";
import homePageFirst2nd from "../assets/homePage_images/homePageFish2ndt.jpg";
import homePageFirst3rd from "../assets/homePage_images/homePageFish3rd.jpg";
import homePageFirst4th from "../assets/homePage_images/homePageFish4th.jpg";
import doctorKOL from "../assets/homePage_images/doctorKOL.jpg";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Masonry from 'react-masonry-css';
import Slider from "react-slick";
import {IoCalendarOutline} from "react-icons/io5";
import {BsFillTelephoneFill} from "react-icons/bs";
import {FaUserDoctor} from "react-icons/fa6";
import {CiStethoscope} from "react-icons/ci";
import {CiMedicalClipboard} from "react-icons/ci";
import {LuHeartPulse} from "react-icons/lu";
import {PiSyringe} from "react-icons/pi";
import {useDoctorList} from "../hooks/useService.js";
import {DoctorCard} from "../components/Card";
import someActive1 from "../assets/homePage_images/someActive1.jpg"
import someActive2 from "../assets/homePage_images/someActive2.jpg"
import someActive3 from "../assets/homePage_images/someActive3.jpg"
import someActive4 from "../assets/homePage_images/someActive4.jpg"
import someActive5 from "../assets/homePage_images/someActive5.jpg"
import someActive6 from "../assets/homePage_images/someActive6.jpg"
import Footer from "../components/Footer.jsx";
import ContactButton from "../components/ContactButton.jsx";


function HomePage() {
    const {doctors, doctorLoading, doctorError} = useDoctorList();


    const images1 = [
        {id: 1, src: homePageFirst1st, alt: 'KOI_1'},
        {id: 2, src: homePageFirst2nd, alt: 'KOI_2'},
        {id: 3, src: homePageFirst3rd, alt: 'KOI_3'},
        {id: 4, src: homePageFirst4th, alt: 'KOI_4'}
    ];

    const image2 = [
        someActive1,
        someActive2,
        someActive3,
        someActive4,
        someActive5,
        someActive6
    ]

    const settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
    };

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 1500,
    }

    const breakpoints = {
        default: 3, // Hiển thị 3 nút trên 1 hàng
        1100: 2,    // Hiển thị 2 nút trên màn hình nhỏ hơn
        700: 1      // Hiển thị 1 nút trên màn hình rất nhỏ
    };


    return (
        <>
            <CustomerNavBar/>

            <div className={styles.homePageContainer}>
                {/* Phần nội dung đầu tiên */}
                <div className={styles.homePageFirstContent}>
                    <Slider {...settings1}>
                        {images1.map((image) => (
                            <div key={image.id} className={styles.sliderItem}>
                                <img src={image.src} alt={image.alt} className={styles.sliderImage}/>
                            </div>
                        ))}
                    </Slider>

                    <div className={styles.buttonsContainer}>
                        <h1>Tận tâm, chuyên nghiệp – Tạo nên sự khác biệt</h1>
                        <span>
                            Với tâm huyết và sự am hiểu sâu sắc về cá Koi, chúng tôi luôn đặt chất lượng lên hàng đầu trong từng dịch vụ.
                            Sự khác biệt đến từ quy trình chăm sóc chuyên nghiệp và đội ngũ giàu kinh nghiệm, mang lại sự an tâm cho khách hàng.
                        </span>

                        {/* Phần nút bên dưới */}
                        <Masonry
                            breakpointCols={breakpoints}
                            className={styles.myMasonryGrid}
                            columnClassName={styles.myMasonryGridColumn}
                        >
                            <div className={styles.functionButton}
                                 onClick={() => window.open("https://zalo.me/0901922117", "_blank", "noopener,noreferrer")}>
                                <BsFillTelephoneFill size={30} color="orange" style={{marginRight: '10px'}}/>
                                <h4>Gọi tổng đài</h4>
                            </div>

                            <div className={styles.functionButton}
                                 onClick={() => window.location.href = "/customer/booking-page"}>
                                <IoCalendarOutline size={30} color="orange" style={{marginRight: '10px'}}/>
                                <h4>Đặt Lịch Hẹn</h4>
                            </div>

                            <div className={styles.functionButton}
                                onClick={() => window.location.href = "/doctor-list"}>
                                <FaUserDoctor size={30} color="orange" style={{marginRight: '10px'}}/>
                                <h4>Tìm Bác Sĩ</h4>
                            </div>
                        </Masonry>
                    </div>
                </div>

                {/* Phần thứ hai */}
                <div className={styles.homePageSecond}>
                    <div className={styles.homePageSecondTitle}>
                        <h1>Tại sao lại chọn KoiKung?</h1>
                        <div className={styles.orangeLine}></div>
                    </div>
                    <div className={styles.homePageSecondContent}>
                        <div className={styles.homePageSecondLeft}>
                            <img src={doctorKOL} alt="web-avatar"/>
                        </div>
                        <div className={styles.homePageSecondRight}>
                            <div className={styles.homePageSecordRightPart}>
                                <span className={styles.hPSRPIcon}>
                                    <CiStethoscope size={60}/>
                                </span>
                                <div>
                                    <h2>Chuyên gia hàng đầu</h2>
                                    <p className={styles.hPSRPContent}>
                                        Trung tâm chúng tôi sở hữu đội ngũ chuyên gia cá Koi giàu kinh nghiệm, kết hợp
                                        cùng các kỹ thuật viên chuyên chăm sóc cá bài bản. Chúng tôi cam kết mang lại
                                        dịch vụ chất lượng cao và sự hài lòng cho khách hàng.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.homePageSecordRightPart}>
                                <span className={styles.hPSRPIcon}>
                                    <LuHeartPulse size={60}/>
                                </span>
                                <div>
                                    <h2>Chất lượng xứng tầm</h2>
                                    <p className={styles.hPSRPContent}>
                                        Trung tâm KoiKung được quản lý bởi các nhà quản lý giàu kinh nghiệm, cùng với sự
                                        hỗ trợ của kỹ thuật hiện đại, mang lại cho khách hàng dịch vụ chăm sóc cá toàn
                                        diện.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.homePageSecordRightPart}>
                                <span className={styles.hPSRPIcon}>
                                    <CiMedicalClipboard size={60}/>
                                </span>
                                <div>
                                    <h2>Công nghệ tiên tiến</h2>
                                    <p className={styles.hPSRPContent}>
                                        Chúng tôi ứng dụng công nghệ tiên tiến trong chăm sóc cá Koi, đảm bảo sự tối ưu
                                        và hiệu quả cao.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.homePageSecordRightPart}>
                                <span className={styles.hPSRPIcon}>
                                    <PiSyringe size={60}/>
                                </span>
                                <div>
                                    <h2>Nghiên cứu & Đổi mới</h2>
                                    <p className={styles.hPSRPContent}>
                                        Chúng tôi không ngừng nâng cao kiến thức và tìm kiếm phương pháp mới để chăm sóc
                                        cá Koi tốt nhất.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.homePageThird}>
                    <h1>Đội ngũ Chuyên gia của chúng tôi</h1>
                    <div className={styles.orangeLine}></div>
                    {doctorLoading && <p>Đang tải danh sách bác sĩ...</p>}
                    {doctorError && <p>{doctorError}</p>}
                    <Slider {...settings2}>
                        {doctors && Array.isArray(doctors) && doctors.map((doctorData) => (
                            <div key={doctorData.doctor.id}>
                                <DoctorCard
                                    fullname={doctorData.doctor.fullName}
                                    qualification={doctorData.qualification}
                                    experience={doctorData.doctor.experience}
                                    profilePic={doctorData.doctor.imageUrl}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>


                <div className={styles.homePageFourth}>
                    <h1>Một số hình ảnh tại trung tâm</h1>
                    <div className={styles.orangeLine}></div>

                    <Masonry
                        breakpointCols={breakpoints}
                        className={styles.myMansoryGrid2}
                        columnClassName={styles.MansoryGrid2Colum}
                    >
                        {image2.map((image2, index) => (
                            <img key={index} src={image2}/>
                        ))}
                    </Masonry>

                </div>
            </div>
            <ContactButton/>
            <Footer/>
        </>
    );
}

export default HomePage;
