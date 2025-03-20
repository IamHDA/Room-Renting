package com.example.backend.entity.mySQL;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "token")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean loggedOut;
    private String accessToken;
    private String refreshToken;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
