package com.example.backend.entity.mySQL;

import com.example.backend.Enum.Provider;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private String identifier;
    private String password;
    @Enumerated(EnumType.STRING)
    private Provider provider;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
