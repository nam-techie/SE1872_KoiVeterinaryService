package com.namtechie.org.repository;

import com.namtechie.org.entity.Account;
import com.namtechie.org.model.AccountResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findAccountByEmail(String email);

    Account findAccountByUsername(String username);

    Account findAccountById(Long id);

    List<Account> findAccountByIsDeletedFalse();
}