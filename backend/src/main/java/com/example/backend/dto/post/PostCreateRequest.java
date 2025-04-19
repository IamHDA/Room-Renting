package com.example.backend.dto.post;

import com.example.backend.dto.AddressDTO;
import lombok.Data;

@Data
public class PostCreateRequest {
    private AddressDTO addressDTO;
    private CreatePostDTO createPostDTO;
}
