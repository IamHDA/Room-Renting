package com.example.backend.entity.mySQL;

import com.example.backend.entity.id.FavouritePostId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "favourite_post")
@NoArgsConstructor
public class FavouritePost {
    public FavouritePost(Post post, User user){
        this.post = post;
        this.user = user;
        this.favouritePostId = new FavouritePostId(post.getId(), user.getId());
        this.createdAt = LocalDateTime.now();
    }

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
    private LocalDateTime createdAt;
}
