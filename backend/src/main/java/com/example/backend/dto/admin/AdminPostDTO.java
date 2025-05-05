package com.example.backend.dto.admin;

import com.example.backend.dto.post.PostDetailDTO;
import com.example.backend.dto.post.PostMediaDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AdminPostDTO {
    private String title;
    private String description;
    private String addressDTO;
    private List<PostMediaDTO> postMediaDTO;
    @JsonFormat(pattern = "HH:mm, dd/MM/yyyy")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "HH:mm, dd/MM/yyyy")
    private LocalDateTime updatedAt;
    private PostDetailDTO postDetailDTO;
}
