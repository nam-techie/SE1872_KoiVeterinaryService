package com.namtechie.org.repository;

import com.namtechie.org.entity.DoctorInfo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DoctorInfoRepository extends JpaRepository<DoctorInfo, Long> {
    DoctorInfo findDoctorInfoByDoctorId(long doctor_id);


}
