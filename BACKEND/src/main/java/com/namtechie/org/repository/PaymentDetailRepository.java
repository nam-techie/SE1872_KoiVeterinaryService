package com.namtechie.org.repository;

import com.namtechie.org.entity.PaymentDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentDetailRepository extends JpaRepository<PaymentDetail, Long> {
    List<PaymentDetail> findByPaymentId(Long paymentId);

    PaymentDetail findByPaymentIdAndPrice(Long paymentId, long price);

    List<PaymentDetail> findListByPaymentIdAndStatus(Long paymentId, boolean status);

    PaymentDetail findByPaymentIdAndStatus(Long paymentId, boolean status);

}