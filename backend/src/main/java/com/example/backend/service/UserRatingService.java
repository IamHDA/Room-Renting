package com.example.backend.service;

import com.example.backend.dto.TotalRating;

public interface UserRatingService {
    TotalRating getTotalRating(long reviewedId);
    String rateUser(long reviewedId, int rate);
    int getUserRate(long reviewedId);
}
