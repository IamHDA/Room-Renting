package com.example.backend.dto.user;

import lombok.Builder;

@Builder
public class UserStats {
    private long totalUser;
    private long totalUserThisMonth;
    private long totalUserThisDay;
}
