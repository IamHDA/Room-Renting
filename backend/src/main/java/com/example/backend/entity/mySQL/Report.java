package com.example.backend.entity.mySQL;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "report")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String description;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(nullable = false, name = "reporter_id")
    private User reporter;
}
