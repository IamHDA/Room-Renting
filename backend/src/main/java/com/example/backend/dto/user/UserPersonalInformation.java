package com.example.backend.dto.user;

import lombok.Data;

@Data
public class UserPersonalInformation {
    private String fullName;
    private String addressText;
    private String email;
    private String phoneNumber;
}
