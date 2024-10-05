package com.namtechie.org.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Veterians")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Veterian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long veterianID;

    @Column(nullable = false)
    private String fullname;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String role;
}
