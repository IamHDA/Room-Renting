package com.example.backend.dto.filter;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminPostFilter {
    private String authorName;
    private String sortCondition;
    private String status;
    private int pageNumber;
    private int pageSize;
}
