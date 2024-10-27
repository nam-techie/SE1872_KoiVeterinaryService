package com.namtechie.org.repository;

import com.namtechie.org.entity.TransactionDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRecordsRepository extends JpaRepository<TransactionDetail, Long> {
    TransactionDetail findByPaymentId(Long paymentId);

    TransactionDetail findByPaymentIdAndPrice(Long paymentId, long price);

}
