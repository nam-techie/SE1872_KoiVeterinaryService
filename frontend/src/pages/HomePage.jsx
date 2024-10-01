import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="homepage-left">
        <div className="intro">
          <h1>“Tận tâm, chuyên nghiệp – Tạo nên sự khác biệt”</h1>
          <p>
            Với tâm huyết và sự am hiểu sâu sắc về cá Koi, chúng tôi luôn đặt
            chất lượng lên hàng đầu trong từng dịch vụ. Sự khác biệt đến từ quy
            trình chăm sóc chuyên nghiệp và đội ngũ giàu kinh nghiệm, mang lại
            sự an tâm cho khách hàng.
          </p>
          <button className="cta-button">Xem thêm</button>
        </div>
        <div className="service-icons">
          <div className="service-item">
            <img src="path-to-your-icon1" alt="Đặt khám tại trung tâm" />
            <p>Đặt khám tại trung tâm</p>
          </div>
          <div className="service-item">
            <img src="path-to-your-icon2" alt="Đặt khám theo chuyên gia" />
            <p>Đặt khám theo chuyên gia</p>
          </div>
          <div className="service-item">
            <img src="path-to-your-icon3" alt="Tư vấn khám bệnh qua video" />
            <p>Tư vấn khám bệnh qua video</p>
          </div>
          <div className="service-item">
            <img src="path-to-your-icon4" alt="Y tế tại nhà" />
            <p>Y tế tại nhà</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
