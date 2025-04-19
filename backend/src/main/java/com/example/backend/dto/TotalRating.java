package com.example.backend.dto;

import lombok.Data;

@Data
public class TotalRating {
    private Long totalRating;
    private Long numberOfRating;

    public TotalRating(Long totalRating, Long numberOfRating) {
        this.totalRating = totalRating;
        this.numberOfRating = numberOfRating;
    }
}
