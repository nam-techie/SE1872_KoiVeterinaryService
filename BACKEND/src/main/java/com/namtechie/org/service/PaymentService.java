package com.namtechie.org.service;

import com.namtechie.org.entity.*;
import com.namtechie.org.model.request.ServiceTypeRequestAll;
import com.namtechie.org.model.response.PaymentDepositResponse;
import com.namtechie.org.model.response.PaymentResponse;
import com.namtechie.org.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Random;
import java.util.TreeMap;

@Service
public class PaymentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private TransactionRecordsRepository transactionRecordsRepository;

    @Autowired
    AppointmentStatusRepository appointmentStatusRepository;

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

//    public PaymentResponse generatePayment(long appointmentId) {
//        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
//
//        ServiceType serviceType = appointment.getServiceType();
//        Zone zone = appointment.getZone();
//
//        long totalPrice = serviceType.getBase_price() + zone.getFee();
//
//        PaymentResponse paymentResponse = new PaymentResponse();
//        paymentResponse.setAppointmentId(appointmentId);
//        paymentResponse.setServiceFee(serviceType.getBase_price());
//        paymentResponse.setZoneFee(zone.getFee());
//        paymentResponse.setTotalPrice(totalPrice);
//
//        Payment payment = new Payment();
//        payment.setAppointment(appointment);
//        payment.setTotalFee(totalPrice);
//        paymentRepository.save(payment);
//
//        return paymentResponse;
//    }

    public String sendPaymentDeposit(long appointmentId) throws Exception {
        // Lấy thông tin cuộc hẹn từ AppointmentService
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
        if (appointment == null) {
            throw new IllegalArgumentException("Không tìm thấy thông tin cuộc hẹn với ID: " + appointmentId);
        }

        // Lấy loại dịch vụ từ cuộc hẹn
        ServiceType serviceType = appointment.getServiceType();
        if (serviceType == null) {
            throw new IllegalArgumentException("Không tìm thấy loại dịch vụ cho cuộc hẹn với ID: " + appointmentId);
        }

        // Lấy giá tiền đặt cọc từ loại dịch vụ
        long depositPrice = serviceType.getBase_price();

        // Gọi hàm createUrl để tạo URL thanh toán và trả về chuỗi đó
        String urlToPayment = createUrl(appointmentId, depositPrice);
        AppointmentStatus appointmentStatus = new AppointmentStatus();
        appointmentStatus.setAppointment(appointment);
        appointmentStatus.setStatus("Pending Deposit Payment");

        appointmentStatusRepository.save(appointmentStatus);

        return urlToPayment; // Trả về URL thanh toán
    }


    public PaymentDepositResponse generatePaymentDeposit(long appointmentId) {
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);


        ServiceType serviceType = appointment.getServiceType();

        long depositPrice = serviceType.getBase_price();
        PaymentDepositResponse paymentDepositResponse = new PaymentDepositResponse();
        paymentDepositResponse.setAppointmentId(appointmentId);
        paymentDepositResponse.setDepositPrice(depositPrice);

        Payment paymentTotal = paymentRepository.findByAppointmentId(appointmentId);
        if (paymentTotal != null) {
            // Nếu đã có Payment, sử dụng bản ghi đó
            paymentTotal.setTotalFee(paymentTotal.getTotalFee() + depositPrice);
            paymentTotal.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        } else {
            // Nếu chưa có, tạo bản ghi mới
            paymentTotal = new Payment();
            paymentTotal.setAppointment(appointment);
            paymentTotal.setTotalFee(serviceType.getBase_price());
            paymentRepository.save(paymentTotal);  // Lưu Payment mới
        }

        TransactionRecords transactionLog = new TransactionRecords();
        transactionLog.setPayment(paymentTotal);
        transactionLog.setTransactionType("Chuyen khoan");
        transactionLog.setTransactionMethod("VNPay");
        transactionLog.setStatus(true);
        transactionLog.setPrice(depositPrice);
        transactionLog.setNotes("Chuyen tien dich vu ban dau");
        transactionRecordsRepository.save(transactionLog);


        AppointmentStatus appointmentStatus = new AppointmentStatus();
        appointmentStatus.setAppointment(appointment);
        appointmentStatus.setStatus("Payment Deposit Successful");

        appointmentStatusRepository.save(appointmentStatus);

        return paymentDepositResponse;
    }

    public void generatePaymentZone(long appointmentId) {
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);


        Zone zone = appointment.getZone();

        long zonePrice = zone.getFee();
        Payment paymentTotal = paymentRepository.findByAppointmentId(appointmentId);
        if (paymentTotal != null) {
            // Nếu đã có Payment, sử dụng bản ghi đó
            paymentTotal.setTotalFee(paymentTotal.getTotalFee() + zonePrice);
            paymentTotal.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        } else {
            // Nếu chưa có, tạo bản ghi mới
            paymentTotal = new Payment();
            paymentTotal.setAppointment(appointment);
            paymentTotal.setTotalFee(zonePrice);
            paymentRepository.save(paymentTotal);  // Lưu Payment mới
        }

        TransactionRecords transactionLog = new TransactionRecords();
        transactionLog.setPayment(paymentTotal);
        transactionLog.setTransactionType("Chuyen khoan");
        transactionLog.setTransactionMethod("VNPay");
        transactionLog.setStatus(true);
        transactionLog.setPrice(zonePrice);
        transactionLog.setNotes("Chuyen tien phi di chuyen");
        transactionRecordsRepository.save(transactionLog);

    }

    public void generatePaymentServiceType(long appointmentId, long serviceTypeId) {
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);

        ServiceType serviceType = serviceTypeRepository.findById(serviceTypeId);

        long serviceTypeFee = serviceType.getBase_price();
        Payment paymentTotal = paymentRepository.findByAppointmentId(appointmentId);
        if (paymentTotal != null) {
            // Nếu đã có Payment, sử dụng bản ghi đó
            paymentTotal.setTotalFee(paymentTotal.getTotalFee() + serviceTypeFee);
            paymentTotal.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        } else {
            // Nếu chưa có, tạo bản ghi mới
            paymentTotal = new Payment();
            paymentTotal.setAppointment(appointment);
            paymentTotal.setTotalFee(serviceTypeFee);
            paymentRepository.save(paymentTotal);  // Lưu Payment mới
        }

        TransactionRecords transactionLog = new TransactionRecords();
        transactionLog.setPayment(paymentTotal);
        transactionLog.setTransactionType("Chuyen khoan");
        transactionLog.setTransactionMethod("VNPay");
        transactionLog.setStatus(true);
        transactionLog.setPrice(serviceTypeFee);
        transactionLog.setNotes("Chuyen tien dich vu them " + serviceType.getName());
        transactionRecordsRepository.save(transactionLog);

    }

    public String sendPaymentTotal(long appointmentId, ServiceTypeRequestAll serviceTypeRequestAll) throws Exception {
        // Lấy thông tin cuộc hẹn từ AppointmentService
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
        long totalPrice = 0;
        totalPrice += appointment.getZone().getFee();
        if (serviceTypeRequestAll.isServiceTypeId5() == true) {
            totalPrice += serviceTypeRepository.findById(5).getBase_price();
        }
        if (serviceTypeRequestAll.isServiceTypeId6() == true) {
            totalPrice += serviceTypeRepository.findById(6).getBase_price();
        }
        if (serviceTypeRequestAll.isServiceTypeId7() == true) {
            totalPrice += serviceTypeRepository.findById(7).getBase_price();
        }
        if (serviceTypeRequestAll.isServiceTypeId8() == true) {
            totalPrice += serviceTypeRepository.findById(8).getBase_price();
        }
        if (serviceTypeRequestAll.isServiceTypeId9() == true) {
            totalPrice += serviceTypeRepository.findById(9).getBase_price();
        }

        if (appointment == null) {
            throw new IllegalArgumentException("Không tìm thấy thông tin cuộc hẹn với ID: " + appointmentId);
        }

        // Lấy loại dịch vụ từ cuộc hẹn
        ServiceType serviceType = appointment.getServiceType();
        if (serviceType == null) {
            throw new IllegalArgumentException("Không tìm thấy loại dịch vụ cho cuộc hẹn với ID: " + appointmentId);
        }

        // Lấy giá tiền đặt cọc từ loại dịch vụ
        long depositPrice = serviceType.getBase_price();

        // Gọi hàm createUrl để tạo URL thanh toán và trả về chuỗi đó
        String urlToPayment = createUrl(appointmentId, totalPrice);
        AppointmentStatus appointmentStatus = new AppointmentStatus();
        appointmentStatus.setAppointment(appointment);
        appointmentStatus.setStatus("Pending Total Payment");

        appointmentStatusRepository.save(appointmentStatus);

        return urlToPayment; // Trả về URL thanh toán
    }

    public void updateTotalFee(long appointmentId, ServiceTypeRequestAll serviceTypeRequestAll) {
        generatePaymentZone(appointmentId);
        if (serviceTypeRequestAll.isServiceTypeId5() == true) {
            generatePaymentServiceType(appointmentId, 5);
        }
        if (serviceTypeRequestAll.isServiceTypeId6() == true) {
            generatePaymentServiceType(appointmentId, 6);
        }
        if (serviceTypeRequestAll.isServiceTypeId7() == true) {
            generatePaymentServiceType(appointmentId, 7);
        }
        if (serviceTypeRequestAll.isServiceTypeId8() == true) {
            generatePaymentServiceType(appointmentId, 8);
        }
        if (serviceTypeRequestAll.isServiceTypeId9() == true) {
            generatePaymentServiceType(appointmentId, 9);
        }
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
        AppointmentStatus appointmentStatus = new AppointmentStatus();
        appointmentStatus.setAppointment(appointment);
        appointmentStatus.setStatus("Payment total Successful");

        appointmentStatusRepository.save(appointmentStatus);

    }

    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder randomString = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            randomString.append(characters.charAt(random.nextInt(characters.length())));
        }
        return randomString.toString();
    }





    // Phương thức createUrl với tham số appointmentId
    public String createUrl(Long appointmentId, long paymentToPayment) throws Exception {
        // Lấy thông tin cuộc hẹn từ AppointmentService
//        Payment payment = paymentRepository.findByAppointmentId(appointmentId);
//        if (payment == null) {
//            throw new IllegalArgumentException("Không tìm thấy thông tin thanh toán cho cuộc hẹn với ID: " + appointmentId);
//        }

        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
        if (appointment == null) {
            throw new IllegalArgumentException("Không tìm thấy thông tin thanh toán cho cuộc hẹn với ID: " + appointmentId);
        }
        // Tính toán số tiền từ cuộc hẹn
//        float totalAmount = payment.getTotalFee();
        float money = paymentToPayment * 100;
        String amount = String.valueOf((int) money);


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);

        // Tạo một chuỗi ngẫu nhiên dài 8 ký tự
        String randomString = generateRandomString(8);

        String tmnCode = "T0HQKZLG";
        String secretKey = "F0LQRHMUCEDG0543CTWHY1H2VD10MLFD";
        String vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        String returnUrl = "https://blearning.vn/guide/swp/docker-local?orderID=" + appointment.getId() + "&random=" + randomString;
        String currCode = "VND";

        Map<String, String> vnpParams = new TreeMap<>();
        vnpParams.put("vnp_Version", "2.1.0");
        vnpParams.put("vnp_Command", "pay");
        vnpParams.put("vnp_TmnCode", tmnCode);
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_CurrCode", currCode);
        vnpParams.put("vnp_TxnRef", String.valueOf(appointment.getId()  + "&random=" + randomString));  // Sử dụng ID của Payment thay vì totalFee
        vnpParams.put("vnp_OrderInfo", "Thanh toan cho ma GD: " + appointment.getId() + "&random=" + randomString );  // Sử dụng ID thay vì totalFee
        vnpParams.put("vnp_OrderType", "other");
        vnpParams.put("vnp_Amount", amount);

        vnpParams.put("vnp_ReturnUrl", returnUrl);
        vnpParams.put("vnp_CreateDate", formattedCreateDate);
        vnpParams.put("vnp_IpAddr", "128.199.178.23");

        StringBuilder signDataBuilder = new StringBuilder();
        for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
            signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("=");
            signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("&");
        }
        signDataBuilder.deleteCharAt(signDataBuilder.length() - 1); // Remove last '&'

        String signData = signDataBuilder.toString();
        String signed = generateHMAC(secretKey, signData);

        vnpParams.put("vnp_SecureHash", signed);

        StringBuilder urlBuilder = new StringBuilder(vnpUrl);
        urlBuilder.append("?");
        for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
            urlBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("=");
            urlBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("&");
        }
        urlBuilder.deleteCharAt(urlBuilder.length() - 1); // Remove last '&'

        return urlBuilder.toString();
    }

    public String createTotalUrl(Long appointmentId, long paymentToPayment) throws Exception {
        // Lấy thông tin cuộc hẹn từ AppointmentService
        Payment payment = paymentRepository.findByAppointmentId(appointmentId);
        if (payment == null) {
            throw new IllegalArgumentException("Không tìm thấy thông tin thanh toán cho cuộc hẹn với ID: " + appointmentId);
        }

//        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
//        if (appointment == null) {
//            throw new IllegalArgumentException("Không tìm thấy thông tin thanh toán cho cuộc hẹn với ID: " + appointmentId);
//        }
        // Tính toán số tiền từ cuộc hẹn
//        float totalAmount = payment.getTotalFee();
        float money = paymentToPayment * 100;
        String amount = String.valueOf((int) money);


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);

        String tmnCode = "T0HQKZLG";
        String secretKey = "F0LQRHMUCEDG0543CTWHY1H2VD10MLFD";
        String vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        String returnUrl = "https://blearning.vn/guide/swp/docker-local?orderID=" + payment.getId();
        String currCode = "VND";

        Map<String, String> vnpParams = new TreeMap<>();
        vnpParams.put("vnp_Version", "2.1.0");
        vnpParams.put("vnp_Command", "pay");
        vnpParams.put("vnp_TmnCode", tmnCode);
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_CurrCode", currCode);
        vnpParams.put("vnp_TxnRef", String.valueOf(payment.getId()));  // Sử dụng ID của Payment thay vì totalFee
        vnpParams.put("vnp_OrderInfo", "Thanh toan cho ma GD: " + payment.getId());  // Sử dụng ID thay vì totalFee
        vnpParams.put("vnp_OrderType", "other");
        vnpParams.put("vnp_Amount", amount);

        vnpParams.put("vnp_ReturnUrl", returnUrl);
        vnpParams.put("vnp_CreateDate", formattedCreateDate);
        vnpParams.put("vnp_IpAddr", "128.199.178.23");

        StringBuilder signDataBuilder = new StringBuilder();
        for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
            signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("=");
            signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("&");
        }
        signDataBuilder.deleteCharAt(signDataBuilder.length() - 1); // Remove last '&'

        String signData = signDataBuilder.toString();
        String signed = generateHMAC(secretKey, signData);

        vnpParams.put("vnp_SecureHash", signed);

        StringBuilder urlBuilder = new StringBuilder(vnpUrl);
        urlBuilder.append("?");
        for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
            urlBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("=");
            urlBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("&");
        }
        urlBuilder.deleteCharAt(urlBuilder.length() - 1); // Remove last '&'

        return urlBuilder.toString();
    }

    private String generateHMAC(String secretKey, String signData) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac hmacSha512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        hmacSha512.init(keySpec);
        byte[] hmacBytes = hmacSha512.doFinal(signData.getBytes(StandardCharsets.UTF_8));

        StringBuilder result = new StringBuilder();
        for (byte b : hmacBytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
}


