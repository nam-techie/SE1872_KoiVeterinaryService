package com.namtechie.org.repository;

import com.namtechie.org.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findCustomerByFullname(String fullname);
    Customer findCustomerByCustomerID(long id);
}
