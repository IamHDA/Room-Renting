package com.example.backend.dto.filter;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminUserFilter {
    private String fullName;
    private String phoneNumber;
    private String email;
    private String sortCondition;
    private int pageNumber;
    private int pageSize;
}
