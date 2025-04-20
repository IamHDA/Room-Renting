package com.example.backend.dto.user;

import lombok.Data;


@Data
public class AdminUserDTO {
    private String fullName;
    private byte[] avatar;
    private byte[] backgroundImage;
    private String status;
    private String addressDTO;
}
