package com.namtechie.org.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "VeterianResponses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VeterianResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long responseID;

    @ManyToOne
    @JoinColumn(name = "assignmentID", nullable = false)
    private VeterianAssignment veterianAssignment;

    @Column(nullable = false)
    private Boolean isConfirmed;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date responseDate;

    @Column(length = 500)
    private String reason;



    // Getters and Setters
}
