package com.namtechie.org.repository;

import com.namtechie.org.entity.Account;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findAccountByEmail(String email);

    Account findAccountByUsername(String username);

    Account findAccountById(Long id);

    boolean existsByIsDeleted(Account account);

    List<Account> findAccountByIsDeletedFalse();

    List<Account> findByRoleIgnoreCase(String role);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    long countByRole(String role);

    @Transactional
    @Modifying
    @Query("UPDATE Account a SET a.isDeleted = :isDeleted WHERE a.email = :email")
    void updateIsDeletedByEmail(@Param("isDeleted") boolean isDeleted, @Param("email") String email);

}
