package com.namtechie.org.repository;

import com.namtechie.org.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findAccountById(long id);
    Account findAccountByUsername(String username);
}
