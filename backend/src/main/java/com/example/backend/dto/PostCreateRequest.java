package com.example.backend.dto;

import lombok.Data;

@Data
public class PostCreateRequest {
    private AddressDTO addressDTO;
    private CreatePostDTO createPostDTO;
}
