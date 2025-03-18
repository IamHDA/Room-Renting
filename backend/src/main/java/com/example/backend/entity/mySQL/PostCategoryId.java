package com.example.backend.entity.mySQL;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class PostCategoryId {
    private long postId;
    private int categoryId;
}
