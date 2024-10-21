package com.namtechie.org.repository;

import com.namtechie.org.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.List;
import java.sql.Date;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Appointment findAppointmentById(long id);

    @Query("SELECT a FROM Appointment a JOIN a.appointmentDetail ad WHERE a.doctor.id = :doctorId AND ad.appointmentBookingDate = :bookingDate")
    List<Appointment> findAppointmentsByDoctorIdAndBookingDate(@Param("doctorId") long doctorId, @Param("bookingDate") Date bookingDate);


    @Query("SELECT a FROM Appointment a JOIN a.appointmentDetail ad " +
            "WHERE a.doctor.id = :doctorId " +
            "AND ad.appointmentBookingDate = :bookingDate " +
            "AND EXTRACT(HOUR FROM ad.appointmentBookingTime) = EXTRACT(HOUR FROM :bookingTime) " +
            "AND EXTRACT(MINUTE FROM ad.appointmentBookingTime) = EXTRACT(MINUTE FROM :bookingTime) " +
            "AND EXTRACT(SECOND FROM ad.appointmentBookingTime) = EXTRACT(SECOND FROM :bookingTime)")
    Appointment findAppointmentByDoctorIdAndBookingDateAndBookingTime(@Param("doctorId") long doctorId, @Param("bookingDate") Date bookingDate, @Param("bookingTime") Time bookingTime);

}
