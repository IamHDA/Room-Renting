package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostSummaryDTO {
    private long id;
    private long userId;
    private String title;
    private String addressDTO;
    private String description;
    private String thumbnailURL;
    @JsonFormat(pattern = "HH:mm, dd/MM/yyyy")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "HH:mm, dd/MM/yyyy")
    private LocalDateTime updatedAt;
    private PostDetailSummaryDTO postDetailSummaryDTO;
}
