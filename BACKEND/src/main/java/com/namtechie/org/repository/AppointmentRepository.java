package com.namtechie.org.repository;

import com.namtechie.org.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.sql.Date;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Appointment findAppointmentById(long id);

    @Query("SELECT a FROM Appointment a JOIN a.appointmentDetail ad WHERE a.veterian.id = :veterianId AND ad.appointmentBookingDate = :bookingDate")
    List<Appointment> findAppointmentsByVeterianIdAndBookingDate(@Param("veterianId") long veterianId, @Param("bookingDate") Date bookingDate);



}
