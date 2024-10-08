package com.namtechie.org.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Staffs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long staffID;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id") // Liên kết với cột 'id' trong bảng Account
    private Account account;

    @Column(nullable = false)
    private String fullname;

    @Column(nullable = false)
    private String phone;


}
