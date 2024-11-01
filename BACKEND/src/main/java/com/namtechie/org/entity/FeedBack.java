package com.namtechie.org.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;


@Data
@Entity
public class FeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    @JsonIgnore
    private Appointment appointment;

    @Column
    private int rating;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String comment;

    @Column(nullable = false)
    @CreationTimestamp
    private Date created_date;

    private boolean isDeleted;

}
