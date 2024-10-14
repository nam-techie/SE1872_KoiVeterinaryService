package com.namtechie.org.repository;

import com.namtechie.org.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAll();

    @Query("SELECT a FROM Appointment a JOIN a.appointmentDetail ad WHERE a.doctor.id = :doctorId AND ad.appointmentBookingDate = :bookingDate")
    List<Appointment> findAppointmentsByDoctorIdAndBookingDate(@Param("doctorId") long doctorId, @Param("bookingDate") Date bookingDate);

}
