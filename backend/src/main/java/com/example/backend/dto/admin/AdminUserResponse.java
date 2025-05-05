package com.example.backend.dto.admin;

import lombok.Data;

import java.util.List;

@Data
public class AdminUserResponse {
    private List<AdminUserRow> users;
    private long totalUsers;
}
