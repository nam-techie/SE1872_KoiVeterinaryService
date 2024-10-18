package com.namtechie.org.repository;

import com.namtechie.org.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {


    @Query("SELECT p from Payment p where p.appointment.id = :appointmentId")
    // Thêm phương thức để tìm Payment theo appointmentId
    Payment findByAppointmentId(@Param("appointmentId") Long appointmentId);
}
