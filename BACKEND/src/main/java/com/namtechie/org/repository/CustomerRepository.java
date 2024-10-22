package com.namtechie.org.repository;

import com.namtechie.org.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customers, Long> {
    Customers findByAccountId(long accountId);
    


}
