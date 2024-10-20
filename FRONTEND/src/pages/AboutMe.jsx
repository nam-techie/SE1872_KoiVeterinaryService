import styles from "../styles/AboutMe.module.css"
import {CustomerNavBar} from "../components/Navbar.jsx";
    // import Footer from "../components/Footer.jsx";
import { IoIosArrowForward } from "react-icons/io";
import Logov2  from "../assets/aboutMe_images/logo_v2.png"
import Location from "../assets/aboutMe_images/Location.jpg"
import Footer from "../components/Footer.jsx";

function AboutMe(){
    return(
        <>
            <CustomerNavBar/>
            <div className={styles.aboutMeContainer}>
                <div className={styles.breadCrumb}>
                    <a href="/homepage">Trang Chủ</a><IoIosArrowForward size={22}
                                                                        color={"orange"}/><span>Về KOI CUNG</span>
                </div>
                <div className={styles.aboutMeFirst}>
                    <div className={styles.aboutMeFirstContent}>
                        <div className={styles.aboutMeFirstContentLeft}>
                            <h2>Giới thiệu trung tâm KoiKung</h2>
                            <p>
                                Chào mừng bạn đến với KoiKung – Trung tâm chuyên cung cấp dịch vụ chăm sóc và tư vấn
                                toàn diện cho cá Koi, từ những người yêu Koi đến các chuyên gia nuôi dưỡng lâu năm.
                                Tại KoiKung, chúng tôi hiểu rằng cá Koi không chỉ là thú cưng, mà còn là biểu tượng của
                                sự may mắn, thịnh vượng và vẻ đẹp hoàn mỹ trong văn hóa Á Đông.
                            </p>

                            <h3>Ý nghĩa của tên gọi KoiKung</h3>
                            <p>
                                “Koi” tượng trưng cho cá Koi – loài cá được yêu thích bởi sự đa dạng màu sắc, vẻ đẹp
                                thanh thoát và ý nghĩa phong thủy sâu sắc.
                                Còn “Kung” lấy cảm hứng từ từ “Kungfu” – biểu trưng cho sự khéo léo, kỹ thuật điêu luyện
                                và sự tận tâm. Tên gọi “KoiKung” thể hiện triết lý hoạt động của chúng tôi:
                                kết hợp giữa tình yêu, sự đam mê và kỹ năng chăm sóc cá Koi một cách tỉ mỉ, chuyên
                                nghiệp.
                            </p>

                            <h3>Sứ mệnh của KoiKung</h3>
                            <p>
                                Tại KoiKung, chúng tôi cam kết mang đến dịch vụ chăm sóc cá Koi toàn diện, bao gồm tư
                                vấn,
                                thăm khám, điều trị, và các giải pháp chăm sóc tại nhà.
                                Với đội ngũ chuyên gia giàu kinh nghiệm và cơ sở vật chất hiện đại, chúng tôi không
                                ngừng
                                cải tiến và áp dụng các phương pháp tiên tiến để giúp cá Koi của bạn phát triển khỏe
                                mạnh và
                                đẹp nhất.
                            </p>
                        </div>
                        <div className={styles.aboutMeFirstContentRight}>
                            <img src={Logov2} alt="KoiKung Logo"/>

                        </div>
                    </div>
                </div>

                <div className={styles.aboutMeSecond}>
                    <h1> Phải Là Koi Cung Vì</h1>
                    <div className={styles.orangeLine}></div>
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
                    <div className={styles.aboutmeThirdContent}>
                        <div className={styles.aboutmeThirdLeft}>
                            <h2>Thông tin bổ sung</h2>
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
                        <div className={styles.aboutmeThirdRight}>
                            <img src={Location} alt="KoiKung"/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>

        </>
    );
}

export default AboutMe