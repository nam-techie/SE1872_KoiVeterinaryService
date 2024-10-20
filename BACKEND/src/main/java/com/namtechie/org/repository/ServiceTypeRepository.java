package com.namtechie.org.repository;

import com.namtechie.org.entity.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
    List<ServiceType>  findAll();
    ServiceType findById(long id);

}
