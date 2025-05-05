package com.example.backend.dto.user;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserStats {
    private long totalUsers;
    private long totalUsersThisMonth;
    private long totalUsersThisDay;
}
