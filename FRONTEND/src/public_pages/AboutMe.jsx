import "../styles/AboutMe.css"
import image from "../assets/images/logo.png"
import journeyicon from "../assets/images/Location.jpg"

function AboutMe() {
    return (
        <>
            <div className="about-page">
                <div className="breadcrumb">
                    <a href="/homepage">Trang chủ</a> &gt; <span>Về KoiKung</span>
                </div>

                <div className="content">
                    <div className="left-content">
                        <h2>Giới thiệu trung tâm KoiKung</h2>
                        <p>
                            Chào mừng bạn đến với KoiKung – Trung tâm chuyên cung cấp dịch vụ chăm sóc và tư vấn toàn
                            diện cho cá Koi, từ những người yêu Koi đến các chuyên gia nuôi dưỡng lâu năm.
                            Tại KoiKung, chúng tôi hiểu rằng cá Koi không chỉ là thú cưng, mà còn là biểu tượng của sự
                            may mắn, thịnh vượng và vẻ đẹp hoàn mỹ trong văn hóa Á Đông.
                        </p>

                        <h3>Ý nghĩa của tên gọi KoiKung</h3>
                        <p>
                            “Koi” tượng trưng cho cá Koi – loài cá được yêu thích bởi sự đa dạng màu sắc, vẻ đẹp thanh
                            thoát và ý nghĩa phong thủy sâu sắc.
                            Còn “Kung” lấy cảm hứng từ từ “Kungfu” – biểu trưng cho sự khéo léo, kỹ thuật điêu luyện và
                            sự tận tâm. Tên gọi “KoiKung” thể hiện triết lý hoạt động của chúng tôi:
                            kết hợp giữa tình yêu, sự đam mê và kỹ năng chăm sóc cá Koi một cách tỉ mỉ, chuyên nghiệp.
                        </p>

                        <h3>Sứ mệnh của KoiKung</h3>
                        <p>
                            Tại KoiKung, chúng tôi cam kết mang đến dịch vụ chăm sóc cá Koi toàn diện, bao gồm tư vấn,
                            thăm khám, điều trị, và các giải pháp chăm sóc tại nhà.
                            Với đội ngũ chuyên gia giàu kinh nghiệm và cơ sở vật chất hiện đại, chúng tôi không ngừng
                            cải tiến và áp dụng các phương pháp tiên tiến để giúp cá Koi của bạn phát triển khỏe mạnh và
                            đẹp nhất.
                        </p>
                    </div>

                    <div className="right-content">
                        <img src={image} alt="KoiKung Logo" className="koi-logo"/>
                        <p className="slogan">Tận tâm, chuyên nghiệp – Tạo nên sự khác biệt</p>
                    </div>
                </div>
            </div>
            <div className="why-choose-us">
                <h2>Tại sao lại chọn chúng tôi?</h2>
                <div className="card-container">
                    <div className="card">
                        <h3 className="card-title">Chăm sóc cá nhân hóa</h3>
                        <p className="card-text">
                            Tại KoiKung, mỗi chú cá Koi đều nhận được sự chăm sóc đặc biệt phù hợp với tình trạng và nhu
                            cầu riêng. Chúng tôi xây dựng kế hoạch chăm sóc dựa trên cá nhân hóa, giúp cá Koi phát triển
                            khỏe mạnh và tự tin về vẻ đẹp tự nhiên của chúng.
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="card-title">Chuyên sâu và hỗ trợ liên tục</h3>
                        <p className="card-text">
                            Không chỉ cung cấp dịch vụ chăm sóc tại trung tâm, KoiKung còn chú trọng đến việc tư vấn
                            chuyên sâu và hỗ trợ khách hàng mọi lúc, mọi nơi. Chúng tôi đồng hành cùng bạn trong hành
                            trình nuôi dưỡng cá Koi, giải đáp mọi thắc mắc và cung cấp những cập nhật kịp thời qua các
                            kênh trực tuyến.
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="card-title">Cộng đồng đam mê cá Koi</h3>
                        <p className="card-text">
                            KoiKung không chỉ là một trung tâm dịch vụ mà còn là nơi kết nối những người yêu thích cá
                            Koi. Chúng tôi xây dựng một cộng đồng chia sẻ kiến thức, kinh nghiệm và niềm đam mê nuôi
                            dưỡng cá Koi, giúp bạn thông tin đầy đủ và hỗ trợ tốt nhất cho loài cá tuyệt đẹp này.
                        </p>
                    </div>
                </div>
            </div>
            <div className="journey-section">
                <div className="journey-content">
                    <div className="journey-image">
                        <img src={journeyicon} alt="Journey Icon"/>
                    </div>
                    <div className="journey-text">
                        <h2>Hành Trình Cùng KoiKung: Từ Đam Mê Đến Chuyên Nghiệp</h2>
                        <p>
                            KoiKung không chỉ là nơi cung cấp dịch vụ chăm sóc cá Koi mà còn là nơi truyền cảm hứng và
                            kiến thức cho những ai yêu thích loài cá tuyệt đẹp này. Chúng tôi hiểu rằng nuôi dưỡng cá
                            Koi không chỉ là việc cho ăn và giữ nước sạch; đó còn là một nghệ thuật, một niềm đam mê đòi
                            hỏi sự kiên nhẫn, hiểu biết, và tình yêu thật sự.
                        </p>
                        <p>
                            Với mỗi khách hàng đến với KoiKung, chúng tôi mong muốn trở thành người bạn đồng hành đáng
                            tin cậy, hỗ trợ và cùng bạn xây dựng một môi trường sống lý tưởng cho cá Koi. Từ việc tư vấn
                            chọn giống cá, xây hồ cá hợp lý, đến việc đào tạo chăm sóc chuyên sâu, chúng tôi luôn sẵn
                            sàng sẻ chia những kiến thức tinh túy từ các chuyên gia hàng đầu trong lĩnh vực này.
                        </p>
                        <p>
                            KoinKung không chỉ là chọn một dịch vụ, mà còn là chọn sự cam kết về chất lượng và niềm đam
                            mê trong từng công đoạn. Hãy để chúng tôi cùng bạn tạo nên những trải nghiệm đáng nhớ trên
                            hành trình khám phá và nuôi dưỡng vẻ đẹp của cá Koi!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

}

export default AboutMe