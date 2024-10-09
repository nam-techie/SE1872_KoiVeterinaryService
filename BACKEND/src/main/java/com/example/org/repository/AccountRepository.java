package com.example.org.repository;

import com.example.org.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findAccountByEmail(String email);

    Account findAccountByUsername(String username);

    Account findAccountById(Long id);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
