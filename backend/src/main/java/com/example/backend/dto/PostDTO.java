package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostDTO {
    private long id;
    private String title;
    private String description;
    private String addressDTO;
    private List<PostMediaDTO> postMediaDTO;
    @JsonFormat(pattern = "HH:mm, dd/MM/yyyy")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "HH:mm, dd/MM/yyyy")
    private LocalDateTime updatedAt;
    private PostDetailDTO postDetailDTO;
    private PostCreator postCreator;
}
