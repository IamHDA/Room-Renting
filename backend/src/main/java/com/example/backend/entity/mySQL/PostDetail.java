package com.example.backend.entity.mySQL;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "detail")
public class PostDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private double area;
    private String bedroom;
    private String bathroom;
    private String water;
    private String electric;
    private String parking;
    private String wifi;

    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;
}
