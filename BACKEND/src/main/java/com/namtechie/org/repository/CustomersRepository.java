package com.namtechie.org.repository;

import com.namtechie.org.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomersRepository extends JpaRepository<Customers, Long> {



    // In CustomersRepository
    @Query("SELECT c.id FROM Customers c WHERE c.account.id = :accountId")
    long findCustomersIdByAccountId(@Param("accountId") long accountId);


}
