package com.example.backend.dto.post;

import lombok.Data;

@Data
public class ChangePostInformation {
    private String title;
    private String description;
    private PostDetailDTO postDetailDTO;
}
