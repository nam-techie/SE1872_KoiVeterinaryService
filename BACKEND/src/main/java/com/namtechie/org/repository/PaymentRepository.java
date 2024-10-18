package com.namtechie.org.repository;

import com.namtechie.org.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Tự động tạo truy vấn để tìm Payment theo appointmentId
    Payment findByAppointmentId(Long appointmentId);
}
