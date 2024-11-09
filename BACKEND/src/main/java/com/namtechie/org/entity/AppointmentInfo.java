package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Data
public class AppointmentInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    @JsonBackReference
    private Appointment appointment;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false)
    private Date appointmentBookingDate;

    @Column(nullable = false)
    private Time appointmentBookingTime;

    @Column(nullable = false)
    @CreationTimestamp
    private Timestamp createdDate;

    //này là miêu tả nội dung điều trị (note hay description gì cũng được)
    @Column(columnDefinition = "TEXT")
    private String descriptions;

// dùng để set up TimeZone Việt Nam khi deploy từ server Mỹ
    @PostLoad
    @PostPersist
    public void adjustCreatedDate() {
        if (createdDate != null) {
            LocalDateTime localDateTime = createdDate.toLocalDateTime();
            ZonedDateTime vietnamTime = localDateTime.atZone(ZoneId.of("UTC")).withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"));
            createdDate = Timestamp.valueOf(vietnamTime.toLocalDateTime());
        }
    }

}