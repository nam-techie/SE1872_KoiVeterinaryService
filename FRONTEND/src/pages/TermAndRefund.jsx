import styles from "../styles/TermAndRefund.module.css";
import { CustomerNavBar } from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ContactButton from "../components/ContactButton.jsx";

function TermAndRefund() {
  return (
    <>
      <CustomerNavBar />
      <div className={styles.termsContainer}>
        {/*Mục 1: Chính sách bảo mật*/}
        <div className={styles.termsSection}>
          <h2>1. Chính sách bảo mật</h2>
          <p>
            <h3>1.1 Mục đích và phạm vi thu thập?</h3>
            Để truy cập và sử dụng một số dịch vụ tại KoiKung.com, bạn có thể sẽ
            được yêu cầu đăng ký với chúng tôi thông tin cá nhân (Email, Họ tên,
            Số ĐT liên lạc…). Mọi thông tin khai báo phải đảm bảo tính chính xác
            và hợp pháp. Chúng tôi không chịu mọi trách nhiệm liên quan đến pháp
            luật của thông tin khai báo. Chúng tôi cũng có thể thu thập thông
            tin về số lần truy cập, bao gồm số trang bạn xem, số links (liên
            kết) bạn click và những thông tin khác liên quan đến việc kết nối
            đến site KoiKung.com. Chúng tôi cũng thu thập các thông tin mà trình
            duyệt Web (Browser) bạn sử dụng mỗi khi truy cập vào KoiKung.com,
            bao gồm: địa chỉ IP, loại Browser, ngôn ngữ sử dụng, thời gian và
            những địa chỉ mà Browser truy xuất đến.
          </p>

          <p>
            <h3>1.2 Phạm vi sử dụng thông tin</h3>
            Chúng tôi thu thập và sử dụng thông tin cá nhân bạn với mục đích phù
            hợp và hoàn toàn tuân thủ nội dung của “Chính sách bảo mật” này. Khi
            cần thiết, chúng tôi có thể sử dụng những thông tin này để liên hệ
            trực tiếp với bạn dưới các hình thức như: gởi thư ngỏ, đơn đặt hàng,
            thư cảm ơn, sms, thông tin về kỹ thuật và bảo mật…
          </p>

          <p>
            <h3>1.3 Thời gian lưu trữ thông tin</h3>
            Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu
            cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại
            trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật
            trên máy chủ của chúng tôi.
          </p>

          <p>
            <h3>1.4 Cam kết bảo mật thông tin cá nhân khách hàng</h3>
            - Thông tin cá nhân của thành viên trên KoiKung.com được cam kết bảo
            mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của chúng
            tôi. Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được
            thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp
            pháp luật có quy định khác. <br />
            <br />
            - Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ
            3 nào về thông tin cá nhân của thành viên khi không có sự cho phép
            đồng ý từ Khách hàng. <br />
            <br />
            - Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn
            đến mất mát dữ liệu cá nhân Khách hàng, chúng tôi sẽ có trách nhiệm
            thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và
            thông báo cho Khách hàng được biết. <br />
            <br />
            - Hệ thống thanh toán thẻ được cung cấp bởi các đối tác cổng thanh
            toán (“Đối Tác Cổng Thanh Toán”) đã được cấp phép hoạt động hợp pháp
            tại Việt Nam. Theo đó, các tiêu chuẩn bảo mật thanh toán thẻ tại
            KoiKung đảm bảo tuân thủ theo các tiêu chuẩn bảo mật ngành. <br />
            <br />- Ban quản lý KoiKung yêu cầu các cá nhân khi đăng ký/sử dụng
            Dịch vụ là thành viên, phải cung cấp đầy đủ thông tin cá nhân có
            liên quan như: Họ và tên, địa chỉ liên lạc, email ... và chịu trách
            nhiệm về tính pháp lý của những thông tin trên. Ban quản lý không
            chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên
            quan đến quyền lợi của Thành viên đó nếu xét thấy tất cả thông tin
            cá nhân của Thành viên đó cung cấp khi đăng ký ban đầu là không
            chính xác.
          </p>

          <p>
            <h3>1.5 Quy định bảo mật</h3>- Chính sách giao dịch thanh toán bằng
            thẻ quốc tế và thẻ nội địa (internet banking) đảm bảo tuân thủ các
            tiêu chuẩn bảo mật của các Đối Tác Cổng Thanh Toán gồm: Thông tin
            tài chính của Khách hàng sẽ được bảo vệ trong suốt quá trình giao
            dịch bằng giao thức SSL 256-bit (Secure Sockets Layer). Mật khẩu sử
            dụng một lần (OTP) được gửi qua Mail để đảm bảo việc truy cập tài
            khoản được xác thực. <br />
            <br />
            - Các nguyên tắc và quy định bảo mật thông tin trong ngành tài chính
            ngân hàng theo quy định của Ngân hàng nhà nước Việt Nam.
            <br />
            <br />
            - Chính sách bảo mật giao dịch trong thanh toán của KoiKung áp dụng
            với Khách hàng:
            <br />
            <br />
            + Thông tin thẻ thanh toán của Khách hàng mà có khả năng sử dụng để
            xác lập giao dịch KHÔNG được lưu trên hệ thống của chúng tôi. Đối
            Tác Cổng Thanh Toán sẽ lưu giữ và bảo mật theo tiêu chuẩn quốc tế
            PCI DSS. <br />
            <br />+ Đối với thẻ nội địa (internet banking), chúng tôi chỉ lưu
            trữ mã đơn hàng, mã giao dịch và tên ngân hàng. Chúng tôi cam kết
            đảm bảo thực hiện nghiêm túc các biện pháp bảo mật cần thiết cho mọi
            hoạt động thanh toán thực hiện trên trang KoiKung.com
          </p>
        </div>

        {/*Mục 2: Dieu khoan dich vu*/}
        <div className={styles.termsSection}>
          <h2>2. Điều khoản sử dụng dịch vụ</h2>
          <p>
            KoiKung cung cấp ba dịch vụ chính liên quan đến cá Koi, bao gồm:
          </p>
          <ul>
            <li>
              <b>Tư vấn về cá Koi:</b> Khách hàng có thể nhận hỗ trợ từ các
              chuyên gia qua hình thức tư vấn trực tiếp tại trung tâm hoặc qua
              video trực tuyến.
            </li>
            <li>
              <b>Khảo sát hồ cá Koi:</b> Chúng tôi cung cấp dịch vụ khảo sát tại
              nhà, đưa ra giải pháp nâng cấp hồ cá và các đề xuất cải thiện hệ
              sinh thái của hồ.
            </li>
            <li>
              <b>Điều trị và chẩn đoán bệnh cho cá Koi:</b> Dịch vụ điều trị
              bệnh có thể được thực hiện tại trung tâm hoặc tại nhà khách hàng,
              tùy theo nhu cầu và mức độ bệnh của cá Koi.
            </li>
          </ul>
          <p>
            Quy trình đặt dịch vụ: Khách hàng có thể đặt lịch thông qua website
            hoặc qua hotline chính thức. Lịch hẹn sẽ được xác nhận trong vòng 24
            giờ kể từ khi tiếp nhận yêu cầu và chỉ được xác nhận hoàn tất sau
            khi thanh toán trực tuyến được thực hiện thành công.
          </p>
          <p>
            Lưu ý: dịch vụ kèm thêm của trung tâm chúng tôi chỉ áp dụng khi quý
            khách lựa chọn dịch vụ điều trị và chẩn đoán bệnh cho cá Koi. Các
            dịch vụ kèm thêm này sẽ được phân tích và đưa ra yêu cầu, đề nghị
            phù hợp từ các chuyên gia, bác sĩ của trung tâm một cách đúng đắn
            nhất. Nếu khách hàng vẫn muốn lựa chọn dịch vụ thêm cho thú cưng của
            mình thì bên trung tâm vẫn sẽ cung cấp cấp dịch vụ một cách đầy đủ
            nhưng sẽ yêu cầu khách hàng cam kết chịu trách nhiệm nếu có vấn đề
            gì xảy ra khi sử dụng dịch vụ kèm thêm này khi không có sự tư vấn đề
            từ các chuyên gia, bác sĩ. Chúng tôi sẽ hỗ trợ và chịu mọi chi phí
            nếu lỗi lầm hay sai sót xảy ra đến từ phía của Koi Kung.
          </p>
        </div>

        {/*Muc 3: Phuong thuc thanh toan*/}
        <div className={styles.termsSection}>
          <h2>3. Phương thức thanh toán</h2>
          <p>
            Tại KoiKung, chúng tôi cung cấp các phương thức thanh toán linh hoạt
            và an toàn nhằm đáp ứng tối đa nhu cầu của khách hàng: <br />
            <br />- Thanh toán trực tuyến: Đối với các dịch vụ được đặt thông
            qua website, khách hàng bắt buộc phải thanh toán trực tuyến qua cổng
            thanh toán VNPAY, bao gồm các phương thức sau:
          </p>

          <ul>
            <li>Chuyển khoản ngân hàng</li>
            <li>Thẻ tín dụng/ghi nợ</li>
            <li>Ví điện tử</li>
            <li>Quét mã QR</li>
          </ul>

          <p>
            - Thanh toán tại trung tâm: Đối với các dịch vụ mà khách hàng đến
            trực tiếp tại trung tâm KoiKung, chúng tôi hỗ trợ các phương thức
            thanh toán sau: <br />
            <ul>
              <li>Tiền mặt</li>
              <li>Chuyển khoản ngân hàng</li>
            </ul>
          </p>
        </div>

        {/*Muc 4: Hoan tien*/}
        <div className={styles.termsSection}>
          <h2>4. Chính sách hoàn tiền và hủy dịch vụ</h2>
          <p>
            Khách hàng có quyền yêu cầu hủy dịch vụ và sẽ nhận lại phí dịch vụ
            theo các điều kiện sau:
          </p>

          <ul>
            <li>
              Hủy dịch vụ trước 7 ngày trở lên so với ngày hẹn: Hoàn 100% phí
              dịch vụ.
            </li>
            <li>
              Hủy dịch vụ từ 6 ngày đến 3 ngày trước ngày hẹn: Hoàn 50% phí dịch
              vụ.
            </li>
            <li>
              Hủy dịch vụ từ 2 ngày đến 24 giờ trước ngày hẹn: Hoàn 20% phí dịch
              vụ.
            </li>
            <li>
              Hủy dịch vụ trong vòng 24 giờ trước ngày hẹn: Không hoàn tiền.
            </li>
          </ul>

          <p>
            Các trường hợp hoàn tiền sẽ được xử lý trong vòng 7 ngày làm việc kể
            từ khi nhận được yêu cầu hợp lệ từ khách hàng.
          </p>
          <p>Các trường hợp sẽ bị hủy lịch:</p>
          <ul>
            <li>
              Hủy lịch khi khách hàng không thanh tóa trong vòng 15p trở lại khi
              tạo đơn thanh toán.
            </li>
            <li>
              Hủy lịch khi bác sĩ không phản hồi về lịch đặt và sẽ có hoàn tiền
              hợp lí cho khách hàng.
            </li>
          </ul>
        </div>

        {/*Muc 5: BS tu choi lich hen*/}
        <div className={styles.termsSection}>
          <h2>5. Bác sĩ từ chối lịch hẹn</h2>
          <p>
            Trong trường hợp bác sĩ không thể thực hiện lịch hẹn do lý do bất
            khả kháng, KoiKung sẽ cung cấp các lựa chọn sau cho khách hàng:
          </p>
          <ul>
            <li>
              Hoàn trả 100% số tiền đã thanh toán nếu Khách hàng không muốn tiếp
              tục sử dụng dịch vụ.
            </li>
            <li>
              Đổi sang bác sĩ khác phù hợp với thời gian và yêu cầu đã đặt.
            </li>
            <li>
              Chọn thời gian khác với cùng bác sĩ, phù hợp với lịch làm việc của
              cả hai bên.
            </li>
          </ul>
          <p>
            KoiKung cam kết phối hợp chặt chẽ với Khách hàng để đảm bảo mọi vấn
            đề phát sinh đều được giải quyết nhanh chóng và hợp lý.
          </p>
        </div>

        {/*Muc 6: Thay doi chinh sach*/}
        <div className={styles.termsSection}>
          <h2>6. Thay đổi chính sách</h2>
          <p>
            - KoiKung luôn cam kết đảm bảo tính minh bạch và tuân thủ quy định
            pháp luật trong việc cung cấp dịch vụ và bảo vệ quyền lợi của Khách
            hàng. Để đáp ứng yêu cầu vận hành, thay đổi môi trường kinh doanh và
            các quy định pháp luật mới nhất, KoiKung có quyền sửa đổi, cập nhật
            các điều khoản sử dụng và chính sách bảo mật tại bất kỳ thời điểm
            nào mà không cần có sự đồng ý trước của Khách hàng. Những điều chỉnh
            này nhằm nâng cao trải nghiệm Khách hàng, đồng thời đảm bảo rằng các
            hoạt động của chúng tôi luôn tuân thủ chuẩn mực pháp lý hiện hành và
            các yêu cầu an ninh thông tin nghiêm ngặt.
          </p>
          <p>
            - Khi có sự thay đổi, KoiKung cam kết thông báo trước ít nhất 14
            ngày trước khi các điều khoản mới có hiệu lực. Thông tin về những
            thay đổi sẽ được phổ biến rộng rãi thông qua các kênh truyền thông
            chính thức của chúng tôi, bao gồm trang web, email hoặc các phương
            tiện liên lạc khác mà khách hàng đã đăng ký với KoiKung. Điều này
            giúp đảm bảo rằng mọi khách hàng đều có thời gian xem xét và hiểu rõ
            về những thay đổi mới nhất trong điều khoản và chính sách của chúng
            tôi.
          </p>

          <p>
            - Việc Khách hàng tiếp tục sử dụng dịch vụ sau thời gian thông báo
            được hiểu rằng Khách hàng đã đồng ý và chấp thuận tuân thủ các điều
            khoản và chính sách mới. Trong trường hợp Khách hàng không đồng ý
            với bất kỳ thay đổi nào, chúng tôi khuyến nghị Khách hàng ngừng sử
            dụng dịch vụ và liên hệ với bộ phận hỗ trợ Khách hàng để được giải
            quyết. Chúng tôi luôn lắng nghe và sẵn sàng hỗ trợ nhằm đảm bảo rằng
            quyền lợi của Khách hàng được bảo vệ một cách tốt nhất.
          </p>

          <p>
            - Bằng việc duy trì sự linh hoạt trong việc sửa đổi và cập nhật các
            chính sách, KoiKung không chỉ đáp ứng những thay đổi về mặt pháp lý
            và kinh doanh, mà còn đảm bảo rằng các dịch vụ mà chúng tôi cung cấp
            sẽ ngày càng hoàn thiện và an toàn hơn cho tất cả Khách hàng. Chính
            sách bảo mật và điều khoản sử dụng của KoiKung sẽ luôn là những văn
            bản sống, được điều chỉnh để phù hợp với thực tiễn kinh doanh và nhu
            cầu của Khách hàng, hướng tới mục tiêu phục vụ và bảo vệ lợi ích của
            Khách hàng một cách tốt nhất.
          </p>
        </div>

        {/*Muc 7: Trach nhiem*/}
        <div className={styles.termsSection}>
          <h2>7. Trách nhiệm của KoiKung</h2>
          <p>
            - KoiKung luôn cam kết cung cấp các dịch vụ với chất lượng cao nhất,
            đảm bảo đáp ứng nhu cầu của khách hàng một cách chuyên nghiệp, nhanh
            chóng và hiệu quả. Chúng tôi không ngừng cải tiến và tối ưu hóa quy
            trình hoạt động nhằm mang lại trải nghiệm dịch vụ vượt trội, đồng
            thời đảm bảo sự hài lòng và tin cậy của khách hàng đối với thương
            hiệu KoiKung.
          </p>

          <p>
            - Trong trường hợp có bất kỳ vấn đề phát sinh liên quan đến chất
            lượng dịch vụ hoặc các sự cố ngoài ý muốn, khách hàng có thể liên hệ
            trực tiếp với chúng tôi qua hotline hoặc các kênh hỗ trợ chính thức
            khác để được tư vấn và giải quyết nhanh chóng. Đội ngũ chăm sóc
            Khách hàng của KoiKung luôn sẵn sàng hỗ trợ kịp thời, cam kết nỗ lực
            tối đa để tìm ra các giải pháp khắc phục phù hợp với tình huống cụ
            thể, nhằm đảm bảo quyền lợi của Khách hàng.
          </p>

          <p>
            - Với phương châm “Khách hàng là trung tâm”, KoiKung đặt lợi ích và
            sự hài lòng của Khách hàng lên hàng đầu trong mọi hoạt động. Chúng
            tôi luôn lắng nghe, thấu hiểu và không ngừng hoàn thiện để mang lại
            giá trị tốt nhất, đáp ứng và vượt xa mong đợi của khách hàng trong
            mọi tình huống.
          </p>
        </div>
      </div>
      <ContactButton />
      <Footer />
    </>
  );
}

export default TermAndRefund;
