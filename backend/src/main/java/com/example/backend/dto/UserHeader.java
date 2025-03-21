package com.example.backend.dto;

import lombok.Data;

@Data
public class UserHeader {
    private Long id;
    private String fullName;
    private byte[] avatar;
}
