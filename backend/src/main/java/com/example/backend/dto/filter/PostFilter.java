package com.example.backend.dto.filter;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostFilter {
    private String addressDetail;
    private String addressWard;
    private String addressDistrict;
    private String addressCity;
    private double minPrice;
    private double maxPrice;
    private double minArea;
    private double maxArea;
    private String furniture;
    private String sortCondition;
    private int pageNumber;
}
