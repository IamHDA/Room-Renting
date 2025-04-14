package com.example.backend.dto;

import com.example.backend.entity.mySQL.FavouritePost;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FavouritePostDTO {
    public FavouritePostDTO(long userId, long postId) {
        this.userId = userId;
        this.postId = postId;
    }

    private long userId;
    private long postId;
}
