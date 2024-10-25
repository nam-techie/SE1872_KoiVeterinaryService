package com.namtechie.org.repository;

import com.namtechie.org.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository  extends JpaRepository<Payment, Long> {
    Payment findByAppointmentId(Long appointmentId);
}
