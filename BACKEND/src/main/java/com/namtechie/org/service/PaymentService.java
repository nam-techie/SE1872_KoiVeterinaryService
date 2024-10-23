package com.namtechie.org.service;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.Payment;
import com.namtechie.org.entity.ServiceType;
import com.namtechie.org.entity.Zone;
import com.namtechie.org.model.response.PaymentResponse;
import com.namtechie.org.repository.AppointmentRepository;
import com.namtechie.org.repository.PaymentRepository;
import com.namtechie.org.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PaymentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    public PaymentResponse generatePayment(long appointmentId){
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);

        ServiceType serviceType = appointment.getServiceType();
        Zone zone = appointment.getZone();

        long totalPrice = serviceType.getBase_price() + zone.getFee();

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setAppointmentId(appointmentId);
        paymentResponse.setServiceFee(serviceType.getBase_price());
        paymentResponse.setZoneFee(zone.getFee());
        paymentResponse.setTotalPrice(totalPrice);

        Payment payment = new Payment();
        payment.setAppointment(appointment);
        payment.setTotalFee(totalPrice);
        paymentRepository.save(payment);

        return paymentResponse;
    }
}
