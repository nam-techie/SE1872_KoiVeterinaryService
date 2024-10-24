package com.namtechie.org.repository;

import com.namtechie.org.entity.TransactionRecords;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRecordsRepository extends JpaRepository<TransactionRecords, Long> {
}
