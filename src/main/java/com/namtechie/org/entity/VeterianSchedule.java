package com.namtechie.org.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@Entity
@Table(name = "VeterianSchedules", uniqueConstraints = @UniqueConstraint(columnNames = {"veterianID", "workDate", "startTime", "endTime"}))
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VeterianSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleID;

    @ManyToOne
    @JoinColumn(name = "veterianID", nullable = false)
    private Veterian veterian;  // Khóa ngoại liên kết với bảng veterian

    @Column(name = "workDate", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date workDate;  // Ngày làm việc của bác sĩ

    @Column(nullable = false)
    private String workType; // Loại ca làm việc: Center Shift hoặc Home Visit

    @Column(nullable = false)
    private Time startTime;  // Giờ bắt đầu

    @Column(nullable = false)
    private Time endTime;    // Giờ kết thúc

    @Column(nullable = false)
    private Boolean isBooked = false;  // Đánh dấu ca làm việc đã được đặt hay chưa
}
