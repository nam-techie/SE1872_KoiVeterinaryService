package com.namtechie.org.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "VeterianAssignments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VeterianAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentID;

    @ManyToOne
    @JoinColumn(name = "serviceRequestID", nullable = false)
    private ServiceRequest serviceRequest;

    @ManyToOne
    @JoinColumn(name = "veterianID", nullable = false)
    private Veterian veterian;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date assignedDate;

    @Column(nullable = false)
    private String status = "Awaiting Confirmation";
}
