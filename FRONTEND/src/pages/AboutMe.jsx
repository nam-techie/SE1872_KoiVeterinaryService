import styles from "../styles/AboutMe.module.css"
import {CustomerNavBar} from "../components/Navbar.jsx";
import {IoIosArrowForward} from "react-icons/io";
import Location from "../assets/aboutMe_images/Location.jpg"
import Footer from "../components/Footer.jsx";
import ContactButton from "../components/ContactButton.jsx";
import { useEffect, useRef } from 'react';

function AboutMe() {
    const fadeRefs = useRef([]);

    useEffect(() => {
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.isVisible);
                }
            });
        };

        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        fadeRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <CustomerNavBar/>
            <div className={styles.aboutMeContainer}>
                <div className={styles.aboutMeFirst}>
                    <div className={styles.aboutMeFirstContent}>
                        <div className={styles.aboutMeFirstContentLeft}>
                            <div className={`${styles.fadeInSection}`} ref={el => fadeRefs.current[0] = el}>
                                <h2>Giới thiệu trung tâm KoiKung</h2>
                                <p>
                                    Chào mừng bạn đến với KoiKung – Nơi hội tụ đam mê và chuyên môn trong việc chăm sóc cá Koi. 
                                    Chúng tôi tự hào là trung tâm hàng đầu trong lĩnh vực chăm sóc và tư vấn toàn diện cho cá Koi, 
                                    mang đến những giải pháp chuyên nghiệp và tận tâm nhất.
                                </p>
                            </div>

                            <div className={`${styles.fadeInSection}`} ref={el => fadeRefs.current[1] = el}>
                                <h3>Ý nghĩa của tên gọi KoiKung</h3>
                                <p>
                                    "Koi" - Biểu tượng của sự thanh cao và may mắn trong văn hóa Á Đông, kết hợp cùng "Kung" - 
                                    tinh thần của sự điêu luyện và tận tâm. KoiKung không chỉ là một cái tên, mà còn là cam kết 
                                    về sự chuyên nghiệp và đẳng cấp trong từng dịch vụ chúng tôi cung cấp.
                                </p>
                            </div>

                            <div className={`${styles.fadeInSection}`} ref={el => fadeRefs.current[2] = el}>
                                <h3>Sứ mệnh của KoiKung</h3>
                                <p>
                                    Với đội ngũ chuyên gia giàu kinh nghiệm và cơ sở vật chất hiện đại, chúng tôi cam kết 
                                    mang đến những dịch vụ chăm sóc toàn diện nhất cho cá Koi của bạn. Từ tư vấn chuyên sâu 
                                    đến các giải pháp chăm sóc tại nhà, KoiKung luôn đồng hành cùng bạn trong việc tạo nên 
                                    một môi trường sống hoàn hảo cho những chú cá Koi của bạn.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.aboutMeSecond}>
                    <h1> Phải Là Koi Cung Vì</h1>
                    <div className={styles.aboutMeCardContent}>
                        <div className={styles.aboutmeCard}>
                            <h3 className={styles.aboutmeCardTitle}>Chăm sóc cá nhân hóa</h3>
                            <p className={styles.aboutmeCardText}>
                                Tại KoiKung, mỗi chú cá Koi đều nhận được sự chăm sóc đặc biệt phù hợp với tình trạng và
                                nhu
                                cầu riêng. Chúng tôi xây dựng kế hoạch chăm sóc dựa trên cá nhân hóa, giúp cá Koi phát
                                triển
                                khỏe mạnh và tự tin về vẻ đẹp tự nhiên của chúng.
                            </p>
                        </div>
                        <div className={styles.aboutmeCard}>
                            <h3 className={styles.aboutmeCardTitle}>Cộng đồng đam mê cá Koi</h3>
                            <p className={styles.aboutmeCardText}>
                                KoiKung không chỉ là một trung tâm dịch vụ mà còn là nơi kết nối những người yêu thích
                                cá
                                Koi. Chúng tôi xây dựng một cộng đồng chia sẻ kiến thức, kinh nghiệm và niềm đam mê nuôi
                                dưỡng cá Koi, giúp bạn thông tin đầy đủ và hỗ trợ tốt nhất cho loài cá tuyệt đẹp này.
                            </p>
                        </div>
                        <div className={styles.aboutmeCard}>
                            <h3 className={styles.aboutmeCardTitle}>Chăm sóc cá nhân hóa</h3>
                            <p className={styles.aboutmeCardText}>
                                T Không chỉ cung cấp dịch vụ chăm sóc tại trung tâm, KoiKung còn chú trọng đến việc tư
                                vấn
                                chuyên sâu và hỗ trợ khách hàng mọi lúc, mọi nơi. Chúng tôi đồng hành cùng bạn trong
                                hành
                                trình nuôi dưỡng cá Koi, giải đáp mọi thắc mắc và cung cấp những cập nhật kịp thời qua
                                các
                                kênh trực tuyến.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.aboutmeThird}>
                    <div className={styles.aboutmeThirdLeft}>
                        <h2>Thông tin bổ sung</h2>
                        <div className={styles.contentWrapper}>
                            <p>
                                Với mỗi khách hàng đến với KoiKung, chúng tôi mong muốn trở thành người bạn đồng hành
                                đáng
                                tin cậy, hỗ trợ và cùng bạn xây dựng một môi trường sống lý tưởng cho cá Koi. Từ việc tư
                                vấn
                                chọn giống cá, xây hồ cá hợp lý, đến việc đào tạo chăm sóc chuyên sâu, chúng tôi luôn
                                sẵn
                                sàng sẻ chia những kiến thức tinh túy từ các chuyên gia hàng đầu trong lĩnh vực này.
                            </p>
                            <p>
                                KoinKung không chỉ là chọn một dịch vụ, mà còn là chọn sự cam kết về chất lượng và niềm
                                đam
                                mê trong từng công đoạn. Hãy để chúng tôi cùng bạn tạo nên những trải nghiệm đáng nhớ
                                trên
                                hành trình khám phá và nuôi dưỡng vẻ đẹp của cá Koi!
                            </p>
                        </div>
                    </div>
                    <div className={styles.aboutmeThirdRight}>
                        <img src={Location} alt="KoiKung Info"/>
                    </div>
                </div>
            </div>
            <ContactButton/>
            <Footer/>

        </>
    );
}

export default AboutMe