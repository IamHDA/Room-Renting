package com.example.backend.entity.mySQL;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class FavouritePostId {
    private long userId;
    private long postId;
}
