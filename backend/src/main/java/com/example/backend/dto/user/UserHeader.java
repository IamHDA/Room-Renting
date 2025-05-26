package com.example.backend.dto.user;

import com.example.backend.Enum.Role;
import com.example.backend.Enum.UserStatus;
import lombok.Data;

@Data
public class UserHeader {
    private long id;
    private String fullName;
    private byte[] avatar;
    private UserStatus status;
    private Role role;
}
