package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class AppointmentStatus {  // Đã sửa tên class

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "appointment_id", nullable = false)  // Sửa lại tên
    @JsonBackReference
    private Appointment appointment;

    @OneToOne(mappedBy = "appointmentStatus", cascade = CascadeType.ALL)  // Đảm bảo tên thuộc tính đúng trong class Payment
    @JsonManagedReference
    private TransactionRecords transactionRecords;

    private String status;
    private Timestamp createDate;
    private String notes;

}
