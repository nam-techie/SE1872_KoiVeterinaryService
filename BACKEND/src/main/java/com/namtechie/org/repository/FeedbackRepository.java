package com.namtechie.org.repository;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.FeedBack;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FeedbackRepository extends JpaRepository<FeedBack, Long> {
    FeedBack findByAppointmentId(Long id);

    boolean existsById(Long id);

    FeedBack findByAppointment(Appointment appointment);


    @Transactional
    @Modifying
    @Query("UPDATE FeedBack f SET f.isDeleted = :isDeleted WHERE f.id = :id")
    void updateIsDeletedByFeedbackId(@Param("isDeleted") boolean isDeleted, @Param("id") Long id);

    boolean existsByIsDeleted(Boolean isDeleted);


}
