package com.namtechie.org.repository;

import com.namtechie.org.entity.Payment;
import com.namtechie.org.entity.TransactionRecords;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRecordsRepository extends JpaRepository<TransactionRecords, Long> {
    TransactionRecords findByPaymentId(Long paymentId);

    TransactionRecords findByPaymentIdAndPrice(Long paymentId, long price);

}
