import "../styles/ServicePage.css";
import service1 from "../assets/images/service1.jpg"
import service2 from "../assets/images/service2.jpg"
import service3 from "../assets/images/service3.jpg"
import service4 from "../assets/images/service4.jpg"
import {Link} from "react-router-dom";
import BookingPage from "../public_pages/BookingPage.jsx"

function ServicesPage() {
  return (
      <>
        <div className="service-container">
          <div className="service-content">
            <div className="breadcrumb">
              <a href="/homepage">Trang chủ</a> &gt; <span>Dịch Vụ</span>
            </div>
            <h1>DỊCH VỤ</h1>
            <div className="red-line"></div>
            <div className="service-item">
              <div className="service-image">
                <img src={service1} alt="Đặt lịch khám tại trung tâm"/>
                <Link to="/bookingpage">
                  <button className="book-button">Đặt ngay</button>
                </Link>
              </div>
              <div className="service-description">
                <h2>Đặt lịch khám tại trung tâm</h2>
                <p>
                  Dịch vụ "Đặt khám tại trung tâm" giúp bạn dễ dàng đặt lịch hẹn trước với chuyên gia mà không cần phải
                  xếp hàng chờ đợi. Chỉ cần vài thao tác đơn giản, bạn có thể chọn thời gian phù hợp và đến khám đúng
                  lịch hẹn. Với không gian hiện đại và đầy đủ trang thiết bị, cùng đội ngũ chuyên gia giàu kinh nghiệm,
                  cá Koi của bạn sẽ được thăm khám nhanh chóng và chu đáo. Tận hưởng sự tiện lợi tuyệt đối và trải
                  nghiệm dịch vụ chăm sóc cá Koi chất lượng cao mà không mất thời gian chờ đợi.
                </p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-image">
                <img src={service2} alt="Đặt lịch khám theo chuyên gia"/>
                <Link to="/bookingpage">
                  <button className="book-button">Đặt ngay</button>
                </Link>
              </div>
              <div className="service-description">
                <h2>Đặt lịch khám tại nhà</h2>
                <p>
                  Dịch vụ "Chọn khám cùng chuyên gia" cho phép bạn đặt lịch hẹn ,các bác sĩ, các chuyên gia hàng đầu về
                  cá Koi của chúng tôi sẽ trực tiếp đến nhà của các bạn để chữa bệnh . Với sự am hiểu sâu rộng và kinh nghiệm dày dạn, các chuyên gia sẽ thăm khám chi
                  tiết, đánh giá tình trạng sức khỏe của cá Koi, và đưa ra phương án chăm sóc, điều trị tối ưu. Bạn sẽ
                  được tư vấn chuyên sâu, giải đáp mọi thắc mắc và nhận được sự hỗ trợ tận tâm từ đội ngũ giàu chuyên
                  môn, giúp cá Koi của bạn luôn khỏe mạnh và phát triển tốt nhất.
                </p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-image">
                <img src={service3} alt="Tư vấn khám bệnh có Koi online"/>
                <Link to="/bookingpage">
                  <button className="book-button">Đặt ngay</button>
                </Link>

              </div>
              <div className="service-description">
                <h2>Dịch vụ tư vấn online</h2>
                <p>
                  Dịch vụ tư vấn online giúp bạn kết nối trực tiếp với các chuyên gia giàu kinh nghiệm
                  mà không cần phải rời khỏi nhà. Thông qua các nền tảng trực tuyến, chúng tôi sẽ hỗ trợ bạn chẩn đoán
                  các vấn đề sức khỏe của cá Koi, hướng dẫn cách chăm sóc và điều trị phù hợp nhất. Với quy trình tư vấn
                  chi tiết, nhanh chóng và tiện lợi, dịch vụ này giúp bạn tiết kiệm thời gian mà vẫn đảm bảo cá Koi nhận
                  được sự chăm sóc tốt nhất. Hãy đặt lịch tư vấn ngay hôm nay để nhận được sự hỗ trợ kịp thời và hiệu
                  quả!
                </p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-image">
                <img src={service4} alt="Y tế tại nhà"/>
                <Link to="/bookingpage">
                  <button className="book-button">Đặt ngay</button>
                </Link>
              </div>
              <div className="service-description">
                <h2>Khảo Sát Hồ Cá Tại Nhà</h2>
                <p>
                  Với dịch vụ này, bạn không chỉ nhận được sự chăm sóc tận tình từ các chuyên gia, mà còn an tâm
                  rằng môi trường sống của cá Koi luôn được theo dõi và duy trì ở mức độ tốt nhất. Bác sĩ chuyên
                  khoa sẽ đến tận nơi để thực hiện một cuộc kiểm tra toàn diện chất lượng nước trong hồ cá của
                  bạn. Với sự am hiểu sâu sắc và kinh nghiệm dày dạn, họ sẽ tiến hành kiểm tra một loạt các chỉ
                  tiêu quan trọng, bao gồm amoniac, nitrit, nitrat, độ pH, độ cứng của nước (kH), độ mặn và
                  nhiệt độ. Những yếu tố này đóng vai trò vô cùng quan trọng trong việc duy trì một môi
                  trường sống lý tưởng cho cá Koi của bạn. Không chỉ dừng lại ở đó, bác sĩ còn kiểm tra
                  clo và oxy trong nước, hai yếu tố thiết yếu ảnh hưởng đến sức khỏe của sinh vật trong
                  hồ. Họ sẽ phân tích nguồn nước đầu vào để đảm bảo rằng mọi điều kiện đều đáp ứng tiêu
                  chuẩn chất lượng, giúp cá Koi của bạn phát triển mạnh mẽ và khỏe mạnh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default ServicesPage;
