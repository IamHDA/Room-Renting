package com.example.backend.entity.id;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Embeddable
public class FavouritePostId {
    public FavouritePostId(long postId, long userId) {
        this.postId = postId;
        this.userId = userId;
    }

    private long userId;
    private long postId;
}
