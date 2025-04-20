package com.example.backend.dto.post;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PostStats {
    private long totalPosts;
    private long totalPostsThisMonth;
    private long totalPostsThisDay;
}
