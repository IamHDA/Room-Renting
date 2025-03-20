package com.example.backend.dto.payload;

import lombok.Data;

@Data
public class RegisterRequest {
    private String identifier;
    private String password;
    private String fullName;
}
