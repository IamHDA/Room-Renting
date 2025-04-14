package com.example.backend.entity.mySQL;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Builder
@AllArgsConstructor
@Table(name = "detail")
public class PostDetail {
    public PostDetail() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private double price;
    @Column(nullable = false)
    private double area;
    private String bedroom;
    private String bathroom;
    private String water;
    private String electric;
    private String parking;
    private String wifi;
    private String security;
    private String furniture;
}
