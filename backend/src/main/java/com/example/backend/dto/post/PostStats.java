package com.example.backend.dto.post;

import lombok.Builder;

@Builder
public class PostStats {
    private long totalPosts;
    private long totalPostsThisMonth;
    private long totalPostsThisDay;
}
