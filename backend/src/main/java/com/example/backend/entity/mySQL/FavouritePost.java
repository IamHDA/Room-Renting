package com.example.backend.entity.mySQL;

import com.example.backend.entity.id.FavouritePostId;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "favourite_post")
public class FavouritePost {
    @EmbeddedId
    private FavouritePostId favouritePostId;

    @MapsId("userId")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @MapsId("postId")
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
}
