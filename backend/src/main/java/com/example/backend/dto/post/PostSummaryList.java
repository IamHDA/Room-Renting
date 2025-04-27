package com.example.backend.dto.post;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PostSummaryList {
    private List<PostSummaryDTO> posts;
    private long totalLength;
}
