package com.example.backend.dto;

import lombok.Data;

@Data
public class UserPersonalInformation {
    private String fullName;
    private String email;
    private String phoneNumber;
    private String addressText;
}
