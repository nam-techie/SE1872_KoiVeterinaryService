package com.namtechie.org.repository;

import com.namtechie.org.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findAccountByEmail(String email);

    Account findAccountByUsername(String username);

    Account findAccountById(Long id);
}
