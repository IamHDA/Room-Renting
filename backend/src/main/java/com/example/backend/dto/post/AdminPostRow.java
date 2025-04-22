package com.example.backend.dto.post;

import com.example.backend.Enum.PostStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdminPostRow {
    private long id;
    private long userId;
    private String authorName;
    private String title;
    private long reportedTime;
    private PostStatus postStatus;
    @JsonFormat(pattern = "HH:mm, dd/MM/yyyy")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "HH:mm, dd/MM/yyyy")
    private LocalDateTime updatedAt;
}
