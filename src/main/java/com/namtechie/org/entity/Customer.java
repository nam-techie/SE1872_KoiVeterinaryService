package com.namtechie.org.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "Customers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerID;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id") // Liên kết với cột 'id' trong bảng Account
    private Account account;

    @Column(nullable = false)
    private String fullname;


    @Column(nullable = false)
    private String phone;



}
