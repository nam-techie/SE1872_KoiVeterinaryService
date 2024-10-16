package com.namtechie.org.repository;

import com.namtechie.org.entity.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<ServiceType, Long> {

}
