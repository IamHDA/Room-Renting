package com.example.backend.entity.mySQL;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String detail;

    @ManyToOne
    @JoinColumn(name = "ward_id",  nullable = false)
    private Ward ward;

    @OneToMany(mappedBy = "address", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Post> posts;
}


