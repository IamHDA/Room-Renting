package com.example.backend.dto;

import lombok.Data;

@Data
public class UserHeader {
    private long id;
    private String fullName;
    private byte[] avatar;
}
