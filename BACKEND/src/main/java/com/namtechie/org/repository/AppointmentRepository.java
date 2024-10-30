package com.namtechie.org.repository;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAll();

  //  Appointment findById(long id);

    Appointment findAppointmentById(long id);

    List<Appointment> findByDoctorId(long doctorId);

    @Query("SELECT a FROM Appointment a JOIN a.appointmentInfo ad WHERE a.doctor.id = :doctorId AND ad.appointmentBookingDate = :bookingDate  AND a.isCancel = :isCancel")
    List<Appointment> findAppointmentsByDoctorIdAndBookingDateAndCancel(@Param("doctorId") long doctorId, @Param("bookingDate") Date bookingDate, @Param("isCancel") boolean isCancel);


    @Query("SELECT a FROM Appointment a JOIN a.appointmentInfo ad " +
            "WHERE a.doctor.id = :doctorId " +
            "AND ad.appointmentBookingDate = :bookingDate " +
            "AND EXTRACT(HOUR FROM ad.appointmentBookingTime) = EXTRACT(HOUR FROM :bookingTime) " +
            "AND EXTRACT(MINUTE FROM ad.appointmentBookingTime) = EXTRACT(MINUTE FROM :bookingTime) " +
            "AND EXTRACT(SECOND FROM ad.appointmentBookingTime) = EXTRACT(SECOND FROM :bookingTime)")
    Appointment findAppointmentByDoctorIdAndBookingDateAndBookingTime(@Param("doctorId") long doctorId, @Param("bookingDate") Date bookingDate, @Param("bookingTime") Time bookingTime);

    List<Appointment> findAppointmentByDoctorId(long doctorId);

    List<Appointment> findAppointmentByCustomersId(long customerId);

    @Query("SELECT d.id, COUNT(a) as appointment_count FROM Doctor d LEFT JOIN Appointment a ON d.id = a.doctor.id GROUP BY d.id ORDER BY appointment_count ASC")
    List<Object[]> findDoctorAppointmentCounts();


    List<Appointment> findByCustomersId(long customerId);

}
