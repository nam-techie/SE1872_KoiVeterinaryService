import * as React from 'react';
import {Tabs, Tab, Box, Button, Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // Mũi tên trái
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Mũi tên phải
import {useState} from 'react';
import {CustomerNavBar} from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ContactButton from "../components/ContactButton.jsx";
import styles from "../styles/FAQ.module.css"


export default function FAQPage() {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handlePreviousTab = () => {
        if (tabValue > 0) {
            setTabValue(tabValue - 1); // Quay lại tab trước
        }
    };

    const handleNextTab = () => {
        if (tabValue < 6) {
            setTabValue(tabValue + 1); // Chuyển sang tab tiếp theo
        }
    };

    return (
        <>
            <CustomerNavBar/>
            <div className={styles.FAQcontainer}>

                <div style={{width: '80%', margin: '0 auto', paddingTop: '20px'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        {/* Mũi tên trái */}
                        <Button
                            onClick={handlePreviousTab}
                            startIcon={<ArrowBackIosNewIcon/>}
                            sx={{marginRight: '10px', textTransform: 'none'}}
                        />

                        {/* Tabs */}
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="auto tabs example"
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                '& .MuiTab-root': {
                                    borderRadius: '10px', // Bo góc cho các tab
                                    backgroundColor: 'white', // Đổi màu block
                                    transition: 'background-color 0.3s',
                                    marginLeft: '5px',
                                    marginRight: '5px',
                                    padding: '10px',
                                    minHeight: '40px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Thêm hiệu ứng nổi khối cho các tab
                                },
                                '& .Mui-selected': {
                                    backgroundColor: '#f5a623', // Highlight cho tab được chọn
                                    color: '#1976D2',
                                    fontWeight: 'bold',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Nổi khối mạnh hơn cho tab được chọn
                                }
                            }}
                        >
                            <Tab label="10 Câu Hỏi Thường Gặp"/>
                            <Tab label="Chính sách"/>
                            <Tab label="Thanh toán"/>
                            <Tab label="Chăm sóc định kỳ"/>
                            <Tab label="Xử lí khi gặp vấn đề sức khoẻ"/>
                            <Tab label="Thức ăn và Dinh dưỡng"/>
                            <Tab label="Phương pháp phòng ngừa"/>
                        </Tabs>


                        {/* Mũi tên phải */}
                        <Button
                            onClick={handleNextTab}
                            startIcon={<ArrowForwardIosIcon/>}
                            sx={{marginLeft: '10px', textTransform: 'none'}}
                        />
                    </Box>

                    {/* 10 cau hoi thuong gap */}
                    {tabValue === 0 && (
                        <Box sx={{marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
                            <Typography variant="h6" color="primary" sx={{fontWeight: 'bold', marginBottom: '10px'}}>
                                10 Câu Hỏi Thường Gặp
                            </Typography>
                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Làm thế nào để đăng ký dịch vụ tư vấn và chăm
                                        sóc cá
                                        Koi tại trung tâm?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Bạn có thể đăng ký dịch vụ qua website của chúng tôi hoặc gọi điện trực tiếp đến
                                        số
                                        hotline 1800.999. Chúng tôi cung cấp các gói dịch vụ tư vấn trực tiếp hoặc qua
                                        video
                                        call, thuận tiện cho khách hàng dù ở xa.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Trung tâm có cung cấp dịch vụ kiểm tra sức
                                        khỏe cá Koi
                                        tại nhà không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Có, chúng tôi cung cấp dịch vụ kiểm tra sức khỏe cá Koi tại nhà. Đội ngũ chuyên
                                        gia sẽ
                                        đến tận nơi để kiểm tra tình trạng sức khỏe của cá và cung cấp tư vấn chi tiết
                                        về cách
                                        điều trị và chăm sóc.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Làm thế nào để biết cá Koi của tôi có vấn đề
                                        về sức
                                        khỏe?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Những dấu hiệu phổ biến cho thấy cá Koi có thể gặp vấn đề về sức khỏe bao gồm:
                                        da bị đỏ
                                        hoặc loang lổ, cá bơi lờ đờ, nổi lên mặt nước thường xuyên, giảm hoặc bỏ ăn. Nếu
                                        bạn
                                        phát hiện các dấu hiệu này, hãy liên hệ ngay với chúng tôi để nhận được tư vấn
                                        và hỗ trợ
                                        kịp thời.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Trung tâm có hỗ trợ điều trị bệnh cho cá Koi
                                        không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Chúng tôi cung cấp các dịch vụ điều trị các bệnh thường gặp ở cá Koi như nấm, ký
                                        sinh
                                        trùng, bệnh đường tiêu hóa, và các bệnh về da. Bạn có thể mang cá đến trung tâm
                                        hoặc
                                        đăng ký dịch vụ điều trị tại nhà.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Có cần thiết phải kiểm tra chất lượng nước hồ
                                        cá
                                        thường xuyên không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Kiểm tra chất lượng nước là vô cùng quan trọng để duy trì môi trường sống khỏe
                                        mạnh cho
                                        cá Koi. Nước cần được kiểm tra định kỳ về các chỉ số như độ pH, độ cứng,
                                        ammonia,
                                        nitrite và nitrate. Trung tâm chúng tôi có dịch vụ kiểm tra chất lượng nước định
                                        kỳ và
                                        tư vấn giải pháp xử lý.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Trung tâm có cung cấp dịch vụ thiết kế và lắp
                                        đặt hồ
                                        cá Koi không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Hiện tại chúng tôi chưa cung cấp dịch vụ này.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Chi phí điều trị và chăm sóc cá Koi tại trung
                                        tâm là
                                        bao nhiêu?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Chi phí điều trị và chăm sóc cá Koi phụ thuộc vào tình trạng sức khỏe của cá
                                        cũng như
                                        dịch vụ bạn lựa chọn. Bạn có thể xem bảng giá chi tiết trên website của chúng
                                        tôi hoặc
                                        liên hệ trực tiếp để được tư vấn cụ thể.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Làm thế nào để lựa chọn thức ăn phù hợp cho cá
                                        Koi?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Thức ăn cho cá Koi cần phải giàu dinh dưỡng và dễ tiêu hóa. Trung tâm chúng tôi
                                        cung cấp
                                        nhiều loại thức ăn chất lượng cao, phù hợp với từng giai đoạn phát triển của cá
                                        từ cá
                                        con đến cá trưởng thành.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Trung tâm có cung cấp dịch vụ chăm sóc cá Koi
                                        định kỳ
                                        không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Có, chúng tôi cung cấp các gói dịch vụ chăm sóc định kỳ, bao gồm kiểm tra sức
                                        khỏe, vệ
                                        sinh hồ, và tư vấn dinh dưỡng nhằm đảm bảo cá Koi của bạn luôn trong trạng thái
                                        tốt
                                        nhất.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Làm thế nào để phòng ngừa bệnh cho cá
                                        Koi?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Để phòng ngừa bệnh, bạn nên duy trì chất lượng nước ổn định, cung cấp thức ăn
                                        giàu dinh
                                        dưỡng và đảm bảo vệ sinh hồ sạch sẽ. Đồng thời, việc kiểm tra sức khỏe cá định
                                        kỳ và
                                        tách cá mới nhập về ra khỏi hồ chính trong thời gian cách ly là biện pháp quan
                                        trọng để
                                        ngăn ngừa sự lây lan của các bệnh truyền nhiễm.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                        </Box>
                    )}

                    {/* Chinh sach */}
                    {tabValue === 1 && (
                        <Box sx={{marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
                            <Typography variant="h6" color="primary" sx={{fontWeight: 'bold', marginBottom: '10px'}}>
                                Chính sách
                            </Typography>
                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Chính sách bảo hành dịch vụ điều trị cá Koi
                                        như thế
                                        nào?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Chúng tôi cam kết mang đến chất lượng dịch vụ điều trị tốt nhất cho cá Koi
                                        của bạn. Trong trường hợp cá Koi không có sự cải thiện đáng kể sau khi điều trị,
                                        khách
                                        hàng có thể yêu cầu tái khám miễn phí trong vòng 7 ngày kể từ ngày hoàn thành
                                        dịch vụ.
                                        Chính sách bảo hành không áp dụng cho các trường hợp cá mắc bệnh nền nghiêm
                                        trọng hoặc
                                        khi có yếu tố môi trường đột ngột thay đổi gây tác động tiêu cực đến sức khỏe
                                        của cá.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Chính sách hoàn tiền cho các dịch vụ chăm sóc
                                        cá Koi
                                        là gì?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Nếu khách hàng không hài lòng với chất lượng dịch vụ chăm sóc cá Koi tại trung
                                        tâm hoặc
                                        có bất kỳ sự cố nào xảy ra trong quá trình sử dụng dịch vụ, khách hàng có thể
                                        yêu cầu
                                        hoàn tiền trong vòng 7 ngày kể từ khi dịch vụ kết thúc. Để hoàn tất quy trình
                                        hoàn tiền,
                                        khách hàng cần cung cấp hóa đơn và nêu rõ lý do yêu cầu hoàn tiền. Chính sách
                                        này không
                                        áp dụng cho các trường hợp khách hàng vi phạm hướng dẫn chăm sóc cá của trung
                                        tâm.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Chính sách bảo mật thông tin khách hàng khi sử
                                        dụng
                                        dịch vụ tại trung tâm là gì?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Chúng tôi tuyệt đối tôn trọng và bảo mật thông tin cá nhân của khách hàng, bao
                                        gồm thông
                                        tin cá nhân, thông tin liên quan đến tình trạng sức khỏe của cá Koi và các dịch
                                        vụ đã sử
                                        dụng. Trung tâm cam kết chỉ sử dụng các thông tin này cho mục đích liên quan đến
                                        tư vấn
                                        và dịch vụ chăm sóc, và không chia sẻ thông tin với bất kỳ bên thứ ba nào mà
                                        không có sự
                                        đồng ý của khách hàng.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Chính sách đặt và hủy lịch hẹn của trung tâm
                                        như thế
                                        nào?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Khách hàng có thể đặt lịch hẹn cho các dịch vụ tư vấn, kiểm tra và điều trị cá
                                        Koi thông
                                        qua website hoặc hotline của trung tâm. Nếu có nhu cầu hủy hoặc thay đổi lịch
                                        hẹn, khách
                                        hàng vui lòng thông báo trước ít nhất 24 giờ. Trong trường hợp khách hàng không
                                        thông
                                        báo kịp thời, chi phí dịch vụ đã thanh toán có thể không được hoàn lại. Chúng
                                        tôi luôn
                                        cố gắng hỗ trợ khách hàng một cách linh hoạt nhất trong các trường hợp bất khả
                                        kháng.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Chính sách chăm sóc sau điều trị cho cá Koi
                                        của trung
                                        tâm là gì?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Sau khi hoàn thành điều trị cho cá Koi, trung tâm sẽ cung cấp gói dịch vụ chăm
                                        sóc đặc
                                        biệt trong vòng 14 ngày để đảm bảo cá hồi phục hoàn toàn. Dịch vụ này bao gồm
                                        kiểm tra
                                        lại sức khỏe cá Koi, tư vấn chế độ dinh dưỡng, vệ sinh hồ cá, và các biện pháp
                                        ngăn ngừa
                                        bệnh tái phát.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    )}

                    {/* Thanh toan */}
                    {tabValue === 2 && (
                        <Box sx={{marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
                            <Typography variant="h6" color="primary" sx={{fontWeight: 'bold', marginBottom: '10px'}}>
                                Thanh toán
                            </Typography>
                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Trung tâm chấp nhận các phương thức thanh toán
                                        nào?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Chúng tôi chấp nhận nhiều phương thức thanh toán để tạo điều kiện thuận tiện cho
                                        khách
                                        hàng, bao gồm: thanh toán bằng tiền mặt, chuyển khoản ngân hàng, thanh toán qua
                                        thẻ tín
                                        dụng/thẻ ghi nợ (Visa, MasterCard), và thanh toán qua ví điện tử VNPAY. Khách
                                        hàng có
                                        thể chọn phương thức phù hợp nhất khi đăng ký dịch vụ.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Có cần thanh toán trước khi sử dụng dịch vụ
                                        không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Đối với một số dịch vụ, chúng tôi yêu cầu khách hàng thanh toán toàn bộ chi phí
                                        trước
                                        khi hoàn thành đối với những dịch vụ có giá trị nhỏ. Với các dịch vụ có giá trị
                                        lớn hoặc
                                        yêu cầu sự chuẩn bị và điều động nhân viên đến tận nơi, khách hàng cần đặt cọc
                                        trước 50%
                                        tổng chi phí để giữ lịch hẹn. Phần chi phí còn lại sẽ được thanh toán sau khi
                                        hoàn thành
                                        dịch vụ.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Chính sách thanh toán trả sau có áp dụng
                                        không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Trung tâm hiện không áp dụng chính sách thanh toán trả sau cho các dịch vụ chăm
                                        sóc và
                                        điều trị cá Koi. Tuy nhiên, đối với những khách hàng thân thiết hoặc những hợp
                                        đồng chăm
                                        sóc định kỳ dài hạn, chúng tôi có thể linh hoạt về thời gian thanh toán. Nếu có
                                        nhu cầu
                                        đặc biệt, vui lòng liên hệ với chúng tôi để được tư vấn chi tiết.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Tôi có thể yêu cầu hóa đơn VAT cho dịch vụ đã
                                        sử dụng
                                        không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Chúng tôi hoàn toàn hỗ trợ khách hàng xuất hóa đơn VAT cho các dịch vụ đã sử
                                        dụng. Để
                                        yêu cầu xuất hóa đơn, quý khách vui lòng cung cấp thông tin công ty hoặc cá nhân
                                        ngay
                                        trong quá trình đặt dịch vụ. Hóa đơn sẽ được gửi đến khách hàng qua email trong
                                        vòng 3
                                        ngày làm việc sau khi hoàn tất thanh toán.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Chính sách hoàn tiền trong trường hợp hủy dịch
                                        vụ là
                                        gì?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Nếu khách hàng hủy dịch vụ trước 24 giờ so với thời gian đã đặt, chúng tôi sẽ
                                        hoàn trả
                                        100% số tiền đã thanh toán hoặc đặt cọc. Trong trường hợp khách hàng hủy dịch vụ
                                        trong
                                        vòng 24 giờ trước thời điểm thực hiện, chúng tôi sẽ hoàn lại 50% số tiền đặt cọc
                                        để bù
                                        đắp chi phí chuẩn bị dịch vụ. Các trường hợp hủy dịch vụ ngay trước khi thực
                                        hiện sẽ
                                        không được hoàn tiền.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    )}

                    {/* Cham soc dinh ki */}
                    {tabValue === 3 && (
                        <Box sx={{marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
                            <Typography variant="h6" color="primary" sx={{fontWeight: 'bold', marginBottom: '10px'}}>
                                Chăm sóc định kì
                            </Typography>
                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Chăm sóc định kỳ cho cá Koi bao gồm những dịch
                                        vụ
                                        gì?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Chăm sóc định kỳ cho cá Koi tại trung tâm bao gồm các dịch vụ như kiểm tra sức
                                        khỏe tổng
                                        quát, vệ sinh hồ, kiểm tra và điều chỉnh chất lượng nước, kiểm tra và tư vấn về
                                        chế độ
                                        dinh dưỡng, cũng như xử lý các vấn đề sức khỏe nhỏ trước khi chúng trở nên
                                        nghiêm trọng.
                                        Đây là dịch vụ giúp duy trì môi trường sống lành mạnh và đảm bảo sức khỏe tốt
                                        nhất cho
                                        cá Koi.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Bao lâu nên thực hiện chăm sóc định kỳ cho cá
                                        Koi?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Chúng tôi khuyến nghị thực hiện dịch vụ chăm sóc định kỳ cho cá Koi ít nhất mỗi
                                        3 tháng.
                                        Tuy nhiên, nếu hồ cá của bạn có mật độ cá cao hoặc điều kiện môi trường không ổn
                                        định,
                                        việc chăm sóc có thể cần thực hiện thường xuyên hơn, khoảng 1-2 tháng/lần.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Trung tâm có cung cấp gói chăm sóc định kỳ dài
                                        hạn
                                        không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Có, chúng tôi cung cấp các gói chăm sóc định kỳ dài hạn bao gồm dịch vụ kiểm tra
                                        sức
                                        khỏe và vệ sinh hồ cá theo lịch cố định. Các gói dịch vụ này giúp khách hàng
                                        tiết kiệm
                                        chi phí so với việc đặt dịch vụ lẻ từng lần, đồng thời đảm bảo cá Koi luôn được
                                        chăm sóc
                                        tốt nhất.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Chi phí chăm sóc định kỳ cho cá Koi là bao
                                        nhiêu?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Chi phí chăm sóc định kỳ sẽ phụ thuộc vào kích thước hồ cá, số lượng cá Koi cũng
                                        như các
                                        dịch vụ bổ sung mà bạn yêu cầu. Chúng tôi có nhiều gói dịch vụ linh hoạt, từ
                                        chăm sóc cơ
                                        bản cho đến chăm sóc toàn diện. Vui lòng liên hệ với trung tâm để nhận báo giá
                                        chi tiết
                                        phù hợp với nhu cầu của bạn.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Lợi ích của chăm sóc định kỳ đối với sức khỏe
                                        của cá
                                        Koi là gì?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Chăm sóc định kỳ giúp phát hiện sớm các dấu hiệu bệnh lý, giữ cho hồ cá luôn
                                        trong tình
                                        trạng tốt nhất và hạn chế rủi ro các bệnh lây nhiễm. Điều này không chỉ giúp cá
                                        Koi phát
                                        triển khỏe mạnh mà còn kéo dài tuổi thọ và đảm bảo cá có môi trường sống lý
                                        tưởng. Việc
                                        duy trì chất lượng nước và kiểm tra dinh dưỡng thường xuyên cũng giúp tăng cường
                                        hệ miễn
                                        dịch cho cá.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Trung tâm có dịch vụ chăm sóc định kỳ tại nhà
                                        không?</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography>
                                        Có, chúng tôi cung cấp dịch vụ chăm sóc định kỳ tại nhà, nơi các chuyên gia sẽ
                                        đến trực
                                        tiếp hồ cá của bạn để kiểm tra sức khỏe cá, vệ sinh hồ, và điều chỉnh các yếu tố
                                        như
                                        chất lượng nước, nhiệt độ và dinh dưỡng. Dịch vụ này giúp tiết kiệm thời gian và
                                        công
                                        sức cho khách hàng mà vẫn đảm bảo chất lượng chăm sóc tốt nhất.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Làm thế nào để đăng ký gói chăm sóc định
                                        kỳ?</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography>
                                        Bạn có thể đăng ký gói chăm sóc định kỳ trực tiếp trên website của trung tâm
                                        hoặc liên
                                        hệ qua số hotline 1800.999. Chúng tôi sẽ tư vấn chi tiết về các gói dịch vụ và
                                        lịch
                                        trình chăm sóc phù hợp với hồ cá của bạn. Sau khi đăng ký, chúng tôi sẽ sắp xếp
                                        lịch
                                        trình chăm sóc định kỳ và gửi thông báo nhắc nhở trước mỗi lần thực hiện.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    )}

                    {/* Xu li khi gap van de suc khoe */}
                    {tabValue === 4 && (
                        <Box sx={{marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
                            <Typography variant="h6" color="primary" sx={{fontWeight: 'bold', marginBottom: '10px'}}>
                                Xử lý khi gặp vấn đề sức khỏe
                            </Typography>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Dấu hiệu nhận biết cá Koi gặp vấn đề về sức
                                        khỏe là
                                        gì?</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography>
                                        Các dấu hiệu phổ biến cho thấy cá Koi có thể gặp vấn đề sức khỏe bao gồm: cá bơi
                                        lờ đờ,
                                        nổi lên mặt nước thường xuyên, mất màu sắc tươi sáng, có vết loét, sưng, hoặc
                                        vảy rụng.
                                        Khi phát hiện bất kỳ dấu hiệu nào, bạn nên nhanh chóng tìm đến sự hỗ trợ từ
                                        chuyên gia
                                        để kịp thời xử lý.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Khi cá Koi có dấu hiệu bệnh, nên làm gì đầu
                                        tiên?</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography>
                                        Đầu tiên, hãy cách ly cá bị bệnh khỏi hồ chính để tránh lây lan sang các cá
                                        khác. Sau
                                        đó, kiểm tra chất lượng nước trong hồ để xác định các yếu tố bất thường như mức
                                        độ
                                        ammonia, nitrite, hoặc pH. Tiếp theo, liên hệ với trung tâm tư vấn của chúng tôi
                                        để nhận
                                        được hướng dẫn cụ thể về chẩn đoán và điều trị.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Trung tâm có cung cấp dịch vụ kiểm tra và điều
                                        trị
                                        bệnh tại nhà không?</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography>
                                        Có, chúng tôi cung cấp dịch vụ kiểm tra và điều trị bệnh tại nhà. Đội ngũ chuyên
                                        gia của
                                        chúng tôi sẽ đến trực tiếp hồ cá để đánh giá tình trạng sức khỏe của cá Koi,
                                        kiểm tra
                                        các yếu tố như chất lượng nước, nhiệt độ, và các triệu chứng cụ thể. Dựa trên
                                        chẩn đoán,
                                        chúng tôi sẽ đề xuất phương án điều trị phù hợp.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Những bệnh lý thường gặp ở cá Koi là
                                        gì?</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography>
                                        Cá Koi thường gặp các bệnh lý như: bệnh nấm, bệnh do ký sinh trùng, bệnh về da
                                        (loét,
                                        sưng), bệnh tiêu hóa và các vấn đề do chất lượng nước kém. Những bệnh này có thể
                                        xuất
                                        hiện do điều kiện môi trường không phù hợp hoặc sự lây nhiễm từ cá mới được đưa
                                        vào hồ.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Trung tâm có cung cấp dịch vụ điều trị chuyên
                                        sâu cho
                                        cá Koi không?</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography>
                                        Có, trung tâm cung cấp các dịch vụ điều trị chuyên sâu bao gồm sử dụng thuốc
                                        kháng sinh,
                                        thuốc diệt ký sinh trùng, và liệu pháp phục hồi sức khỏe cho cá Koi sau khi điều
                                        trị.
                                        Chúng tôi có thể điều trị trực tiếp tại trung tâm hoặc tại nhà tùy thuộc vào nhu
                                        cầu của
                                        khách hàng và tình trạng của cá.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Làm thế nào để đảm bảo cá Koi không bị tái
                                        phát bệnh
                                        sau khi điều trị?</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography>
                                        Sau khi điều trị, điều quan trọng là duy trì chất lượng nước ổn định, cung cấp
                                        chế độ ăn
                                        uống đầy đủ dinh dưỡng, và theo dõi sát sao sức khỏe của cá. Việc thường xuyên
                                        kiểm tra
                                        các yếu tố môi trường và không đưa cá mới vào hồ mà không qua quá trình cách ly
                                        cũng là
                                        cách hiệu quả để ngăn ngừa tái phát bệnh.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Có cần phải sử dụng thuốc đặc trị cho cá Koi
                                        không?</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography>
                                        Đối với các bệnh nghiêm trọng, thuốc đặc trị là cần thiết. Tuy nhiên, việc tự ý
                                        sử dụng
                                        thuốc mà không có sự hướng dẫn của chuyên gia có thể gây hại cho cá. Chúng tôi
                                        khuyến
                                        nghị khách hàng liên hệ với trung tâm để nhận tư vấn và chỉ định loại thuốc phù
                                        hợp dựa
                                        trên chẩn đoán chính xác.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                        </Box>
                    )}

                    {/* Thuc an va dinh duong */}
                    {tabValue === 5 && (
                        <Box sx={{marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
                            <Typography variant="h6" color="primary" sx={{fontWeight: 'bold', marginBottom: '10px'}}>
                                Thức ăn và dinh dưỡng
                            </Typography>
                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Loại thức ăn nào tốt nhất cho cá
                                        Koi?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Thức ăn tốt nhất cho cá Koi là loại thức ăn có hàm lượng dinh dưỡng cao, giàu
                                        protein,
                                        dễ tiêu hóa
                                        và chứa các khoáng chất, vitamin thiết yếu giúp cá phát triển khỏe mạnh. Các
                                        loại thức
                                        ăn có chứa chất kích thích màu sắc tự nhiên và chất bổ sung miễn dịch cũng rất
                                        quan
                                        trọng để giữ cho cá luôn có màu sắc đẹp và tăng cường sức đề kháng.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Cá Koi cần được cho ăn bao nhiêu lần mỗi
                                        ngày?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Số lần cho ăn phụ thuộc vào nhiệt độ nước và kích thước cá. Khi nhiệt độ nước ở
                                        mức
                                        15-25°C, cá Koi nên được cho ăn 2-3 lần/ngày. Tuy nhiên, khi nhiệt độ nước giảm
                                        dưới
                                        15°C, cá sẽ cần ít thức ăn hơn, có thể chỉ cần cho ăn 1 lần/ngày hoặc thậm chí
                                        ngưng cho
                                        ăn để tránh quá tải hệ tiêu hóa.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Thức ăn nào phù hợp với cá Koi theo từng giai
                                        đoạn
                                        phát triển?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        - Cá Koi nhỏ cần thức ăn dạng mịn, giàu protein để phát triển nhanh chóng.<br/>
                                        - Cá trưởng thành cần thức ăn cân bằng giữa protein, carbohydrate, và chất xơ để
                                        duy trì
                                        sức khỏe.<br/>
                                        - Cá lớn tuổi nên được cho ăn thức ăn dễ tiêu hóa và ít protein hơn để bảo vệ hệ
                                        tiêu
                                        hóa và thận.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Có nên bổ sung vitamin cho cá Koi
                                        không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Việc bổ sung vitamin là rất quan trọng, đặc biệt là vitamin C và E, giúp tăng
                                        cường hệ
                                        miễn dịch và cải thiện sức khỏe tổng quát. Nhiều loại thức ăn thương mại đã được
                                        bổ sung
                                        sẵn vitamin, nhưng việc thêm một lượng nhỏ vitamin tổng hợp vào khẩu phần ăn của
                                        cá có
                                        thể giúp cải thiện hiệu quả sức khỏe.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Tôi có thể cho cá Koi ăn thức ăn tự nhiên như
                                        rau,
                                        trái cây không?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Cá Koi có thể ăn các loại rau như xà lách, đậu xanh, và trái cây như cam hoặc
                                        dưa chuột.
                                        Tuy nhiên, những loại thực phẩm này chỉ nên là một phần nhỏ trong chế độ ăn và
                                        không nên
                                        thay thế hoàn toàn thức ăn chuyên dụng. Điều này giúp bổ sung chất xơ và tăng
                                        cường sự
                                        đa dạng trong chế độ dinh dưỡng của cá Koi.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Làm thế nào để tránh cho cá Koi ăn quá
                                        nhiều?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Hãy chỉ cho cá ăn đủ lượng mà chúng có thể tiêu thụ hết trong vòng 5-10 phút.
                                        Quá nhiều
                                        thức ăn có thể làm ô nhiễm nước và gây stress cho hệ tiêu hóa của cá. Tốt nhất
                                        là nên
                                        theo dõi và điều chỉnh lượng thức ăn dựa trên mức độ hoạt động và thời tiết.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Nên chọn thức ăn viên nổi hay thức ăn chìm cho
                                        cá
                                        Koi?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Thức ăn viên nổi được ưa chuộng vì nó cho phép người nuôi quan sát cá ăn và kiểm
                                        tra
                                        tình trạng sức khỏe. Tuy nhiên, thức ăn chìm cũng có thể được sử dụng trong một
                                        số
                                        trường hợp, đặc biệt là khi cá có thói quen ăn ở đáy hồ hoặc hồ có mật độ cá
                                        cao. Quan
                                        trọng nhất là chọn loại thức ăn phù hợp với thói quen của cá và theo dõi cẩn
                                        thận lượng
                                        thức ăn tiêu thụ.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    )}

                    {/* Phuong phap phong ngua */}
                    {tabValue === 6 && (
                        <Box sx={{marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
                            <Typography variant="h6" color="primary" sx={{fontWeight: 'bold', marginBottom: '10px'}}>
                                Phương pháp phòng ngừa
                            </Typography>
                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Đảm bảo chất lượng nước ổn định</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Chất lượng nước là yếu tố quan trọng nhất để phòng ngừa bệnh cho cá Koi. Bạn cần
                                        duy trì
                                        độ pH từ 7.0 đến 8.5 và kiểm soát các chỉ số như ammonia, nitrite, và nitrate ở
                                        mức an
                                        toàn. Sử dụng hệ thống lọc nước hiệu quả và thay nước định kỳ (không quá 20%
                                        lượng nước
                                        trong một lần) sẽ giúp đảm bảo môi trường nước sạch sẽ và an toàn cho cá.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Cách ly cá mới trước khi thả vào hồ
                                        chung</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Cá mới thường mang theo vi khuẩn hoặc ký sinh trùng có thể gây hại cho đàn cá
                                        hiện có.
                                        Do đó, cần cách ly cá mới trong vòng 2-4 tuần trước khi thả vào hồ chung. Trong
                                        thời
                                        gian cách ly, hãy theo dõi sức khỏe và điều trị nếu phát hiện các dấu hiệu bất
                                        thường để
                                        tránh lây nhiễm bệnh cho cả đàn.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Duy trì chế độ ăn uống cân bằng và đầy đủ dinh
                                        dưỡng</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Việc cung cấp thức ăn chất lượng cao và cân bằng dinh dưỡng giúp tăng cường sức
                                        đề kháng
                                        cho cá Koi. Thức ăn giàu protein, vitamin, khoáng chất và dễ tiêu hóa sẽ giúp cá
                                        phát
                                        triển khỏe mạnh và ngăn ngừa nhiều loại bệnh. Bổ sung thêm vitamin C và E vào
                                        khẩu phần
                                        ăn cũng giúp tăng cường hệ miễn dịch cho cá.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Kiểm tra và xử lý chất lượng nước định
                                        kỳ</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Việc kiểm tra chất lượng nước định kỳ giúp phát hiện sớm những vấn đề có thể ảnh
                                        hưởng
                                        đến sức khỏe của cá, như sự gia tăng ammonia, nitrite hoặc sự thay đổi đột ngột
                                        của pH
                                        và nhiệt độ. Bằng cách này, bạn có thể điều chỉnh kịp thời để ngăn chặn các tình
                                        trạng
                                        nguy hiểm dẫn đến bệnh tật.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Không nuôi quá nhiều cá trong cùng một
                                        hồ</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Mật độ cá trong hồ quá cao có thể gây stress cho cá và làm giảm khả năng chống
                                        chọi với
                                        bệnh tật. Điều này cũng làm gia tăng ô nhiễm nước do chất thải và dư thừa thức
                                        ăn. Đảm
                                        bảo rằng hồ của bạn có đủ không gian để cá Koi di chuyển thoải mái, từ đó giúp
                                        giảm nguy
                                        cơ lây nhiễm bệnh.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Vệ sinh và bảo dưỡng hệ thống lọc nước thường
                                        xuyên</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Hệ thống lọc nước cần được vệ sinh và bảo dưỡng định kỳ để loại bỏ chất thải,
                                        cặn bẩn,
                                        và các mầm bệnh có thể tích tụ. Một hệ thống lọc hoạt động hiệu quả sẽ giúp duy
                                        trì chất
                                        lượng nước tốt, giảm thiểu nguy cơ mắc bệnh cho cá Koi.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{boxShadow: 'none', borderBottom: '1px solid #ddd', '&:before': {display: 'none'}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography sx={{fontWeight: 'bold'}}>Giám sát thường xuyên và phát hiện sớm các dấu
                                        hiệu
                                        bệnh</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Việc giám sát sức khỏe của cá Koi thường xuyên là cách tốt nhất để phát hiện sớm
                                        những
                                        dấu hiệu bệnh tật. Các triệu chứng như cá bơi lờ đờ, bỏ ăn, da có vết lở loét,
                                        hoặc vây
                                        rách cần được xử lý ngay lập tức. Cách ly và điều trị cá bệnh kịp thời giúp ngăn
                                        chặn
                                        bệnh lây lan và bảo vệ sức khỏe cho đàn cá còn lại.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    )}
                </div>
            </div>
            <ContactButton/>
            <Footer/>
        </>
    );
}

