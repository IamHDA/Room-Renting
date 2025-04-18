package com.example.backend.dto;

import com.example.backend.Enum.UserStatus;
import lombok.Data;

@Data
public class UserProfile {
    private long id;
    private String fullName;
    private String phoneNumber;
    private byte[] avatar;
    private byte[] backgroundImage;
    private String status;
    private int joinTime;
    private String dtoAddress;
}
