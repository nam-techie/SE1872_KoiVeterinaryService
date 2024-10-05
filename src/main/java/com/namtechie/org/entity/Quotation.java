package com.namtechie.org.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "Quotations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Quotation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int quotationID;

    @ManyToOne
    @JoinColumn(name = "customerID", nullable = false)
    private Customer customer;  // Khóa ngoại liên kết với bảng customer

    @ManyToOne
    @JoinColumn(name = "staffID", nullable = false)
    private Staff staff;  // Khóa ngoại liên kết với bảng staff

    @Column(nullable = false)
    private String serviceType;  // Loại dịch vụ được báo giá

    @Column(nullable = false)
    private Double price;  // Giá được báo


    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date quotationDate = new Date();
}
