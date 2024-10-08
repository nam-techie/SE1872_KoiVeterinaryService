package com.namtechie.org.repository;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findCustomerByFullname(String fullname);
    Customer findCustomerByCustomerID(long id);
    Optional<Customer> findCustomerByAccount(Account account);
}
