package com.namtechie.org.repository;

import com.namtechie.org.entity.ServiceType;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
    List<ServiceType> findAll();

    ServiceType findById(long id);

    boolean existsById(long id);

    @Transactional
    @Modifying
    @Query("UPDATE ServiceType f SET f.isDeleted = :isDeleted WHERE f.id = :id")
    void updateIsDeletedByServiceTypeId(@Param("isDeleted") boolean isDeleted, @Param("id") Long id);

    boolean existsByName(String name);

    ServiceType findByName(String name);

    ServiceType findByAppointmentId(long appointmentId);

}
