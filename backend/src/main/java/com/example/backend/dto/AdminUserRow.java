package com.example.backend.dto;

import com.example.backend.Enum.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdminUserRow {
    private long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private Role role;
    private long reportedTime;
    @JsonFormat(pattern = "HH:mm, dd/MM/yyyy")
    private LocalDateTime createdAt;
}
