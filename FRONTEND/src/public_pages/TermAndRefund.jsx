// import "../styles/TermAndRefund.css"
// function  TermAndRefund() {
//     return (
//         <>
//             <div className="terms-container">
//                 <h1>Điều khoản dịch vụ và Chính sách hoàn tiền</h1>
//
//                 <div className="terms-section">
//                     <h2>1. Chính sách bảo mật</h2>
//                     <p>
//                         Chúng tôi cam kết bảo mật thông tin cá nhân của khách hàng khi sử dụng các dịch vụ tại KoiKung.
//                         Mọi dữ liệu thu thập được chỉ dùng để cung cấp dịch vụ và không chia sẻ với bên thứ ba khi chưa
//                         có sự đồng ý của khách hàng.
//                     </p>
//                 </div>
//
//                 <div className="terms-section">
//                     <h2>2. Điều khoản sử dụng dịch vụ</h2>
//                     <p>KoiKung cung cấp 3 dịch vụ chính:</p>
//                     <ul>
//                         <li><b>Tư vấn về cá Koi:</b> Hỗ trợ khách hàng qua video hoặc trực tiếp.</li>
//                         <li><b>Khảo sát và nâng cấp hồ cá Koi:</b> Khảo sát hồ cá tại nhà và đưa ra giải pháp cải thiện,
//                             chỉnh sửa cũng như nâng cấp.
//                         </li>
//                         <li><b>Điều trị và chẩn đoán bệnh cho cá Koi:</b> Tại trung tâm hoặc tại nhà khách hàng.</li>
//                     </ul>
//                     <p>Quy trình đặt dịch vụ: Khách hàng có thể đặt lịch qua website hoặc hotline và thanh toán trực
//                         tuyến. Xác nhận lịch hẹn sẽ được thực hiện trong vòng 24 giờ.</p>
//                 </div>
//
//                 <div className="terms-section">
//                     <h2>3. Phương thức thanh toán</h2>
//                     <p>Chúng tôi chỉ hỗ trợ thanh toán trực tuyến và phải trả trước qua các phương thức:</p>
//                     <ul>
//                         <li><b>MoMo:</b> Thanh toán nhanh chóng qua ví điện tử.</li>
//                         <li><b>ZaloPay:</b> Tích hợp tiện ích với nhiều người dùng.</li>
//                     </ul>
//                 </div>
//
//                 <div className="terms-section">
//                     <h2>4. Chính sách hoàn tiền và hủy dịch vụ</h2>
//                     <ul>
//                         <li>Hủy dịch vụ trước 7 ngày trở lên so với ngày hẹn: Hoàn 100% phí dịch vụ.</li>
//                         <li>Hủy dịch vụ từ 6 ngày đến 3 ngày trước ngày hẹn: Hoàn 50% phí dịch vụ.</li>
//                         <li>Hủy dịch vụ từ 2 ngày đến 24 giờ trước ngày hẹn: Hoàn 20% phí dịch vụ.</li>
//                         <li>Hủy dịch vụ trong vòng 24 giờ trước ngày hẹn: Không hoàn tiền.</li>
//                     </ul>
//                 </div>
//
//                 <div className="terms-section">
//                     <h2>5. Bác sĩ từ chối lịch hẹn</h2>
//                     <p>Trong trường hợp bác sĩ không thể thực hiện theo yêu cầu:</p>
//                     <ul>
//                         <li>Khách hàng có thể chọn hoàn 100% số tiền nếu không muốn tiếp tục.</li>
//                         <li>Chọn đổi sang bác sĩ khác phù hợp với thời gian đã đặt.</li>
//                         <li>Hoặc đổi thời gian khác với bác sĩ yêu cầu.</li>
//                     </ul>
//                 </div>
//
//                 <div className="terms-section">
//                     <h2>6. Thay đổi chính sách</h2>
//                     <p>KoiKung có quyền thay đổi các điều khoản sử dụng và chính sách bảo mật bất cứ lúc nào. Các thay
//                         đổi sẽ được thông báo trước 7 ngày trước khi áp dụng.</p>
//                 </div>
//
//                 <div className="terms-section">
//                     <h2>7. Trách nhiệm của KoiKung</h2>
//                     <p>
//                         Chúng tôi cam kết cung cấp dịch vụ chuyên nghiệp và đảm bảo sự hài lòng của khách hàng. Nếu có
//                         vấn đề phát sinh, khách hàng có thể liên hệ số hotline để được hỗ trợ một cách nhanh chóng.
//                     </p>
//                 </div>
//             </div>
//         </>
//     );
// }
//     export default TermAndRefund

import React, { useState } from 'react';

// Component cho từng mục (item)
const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item">
            <div className="accordion-title" onClick={toggleOpen}>
                <h3>{title}</h3>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && <div className="accordion-content">{content}</div>}
        </div>
    );
};

// Component chính cho Accordion
const Accordion = () => {
    const items = [
        {
            title: 'General Terms and Conditions',
            content: (
                <p>
                    Thank you for visiting the website ("Website") of Raffles Medical Group Ltd ("RMG"). By accessing this Website and/or using the online services, you shall be deemed to have accepted to be legally bound by these terms and conditions of use. If you DO NOT AGREE to any of these terms and conditions of use, please immediately discontinue your access to this Website and/or use of the online services. We may modify, vary or amend these terms and conditions of use at any time and any such modifications, variations or amendments shall be effective immediately upon posting on this Website. Any use of this Website thereafter shall be deemed to be acceptance of the amended Website.
                </p>
            ),
        },
        {
            title: 'Disclaimer',
            content: <p>Đây là nội dung của phần Disclaimer...</p>,
        },
        {
            title: 'Indemnity',
            content: <p>Đây là nội dung của phần Indemnity...</p>,
        },
        // Add more items here as needed
    ];

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <AccordionItem key={index} title={item.title} content={item.content} />
            ))}
        </div>
    );
};

export default Accordion;

