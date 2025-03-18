package com.example.backend.entity.mySQL;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "post_category")
public class PostCategory {
    @EmbeddedId
    private PostCategoryId postCategoryId;

    @MapsId("postId")
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @MapsId("categoryId")
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
