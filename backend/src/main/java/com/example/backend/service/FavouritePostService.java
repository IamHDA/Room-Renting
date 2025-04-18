package com.example.backend.service;

import com.example.backend.dto.PostSummaryDTO;

import java.util.List;

public interface FavouritePostService {
    String addToFavourite(long id);
    String deleteFromFavourite(long id);
    List<Long> getFavouritePostsIdByUser();
    List<PostSummaryDTO> getFavouritePostsByUser(int order);
}
