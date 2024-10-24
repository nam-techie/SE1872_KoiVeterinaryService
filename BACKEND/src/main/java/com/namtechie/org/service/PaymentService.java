package com.namtechie.org.service;

import com.namtechie.org.entity.*;
import com.namtechie.org.model.request.ServiceTypeRequestAll;
import com.namtechie.org.model.response.PaymentDepositResponse;
import com.namtechie.org.model.response.PaymentResponse;
import com.namtechie.org.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void updateTotalFee(ServiceTypeRequestAll serviceTypeRequestAll) {
        generatePaymentZone(serviceTypeRequestAll.getAppointmentId());
        if (serviceTypeRequestAll.isServiceTypeId5() == true) {
            generatePaymentServiceType(serviceTypeRequestAll.getAppointmentId(), 5);
        }
        if (serviceTypeRequestAll.isServiceTypeId6() == true) {
            generatePaymentServiceType(serviceTypeRequestAll.getAppointmentId(), 6);
        }
        if (serviceTypeRequestAll.isServiceTypeId7() == true) {
            generatePaymentServiceType(serviceTypeRequestAll.getAppointmentId(), 7);
        }
        if (serviceTypeRequestAll.isServiceTypeId8() == true) {
            generatePaymentServiceType(serviceTypeRequestAll.getAppointmentId(), 8);
        }
        if (serviceTypeRequestAll.isServiceTypeId9() == true) {
            generatePaymentServiceType(serviceTypeRequestAll.getAppointmentId(), 9);
        }
        Appointment appointment = appointmentRepository.findAppointmentById(serviceTypeRequestAll.getAppointmentId());
        AppointmentStatus appointmentStatus = new AppointmentStatus();
        appointmentStatus.setAppointment(appointment);
        appointmentStatus.setStatus("Payment total Successful");

        appointmentStatusRepository.save(appointmentStatus);

    }


}
