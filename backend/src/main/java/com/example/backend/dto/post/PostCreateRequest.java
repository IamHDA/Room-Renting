package com.example.backend.dto.post;

import com.example.backend.dto.address.AddressDTO;
import lombok.Data;

@Data
public class PostCreateRequest {
    private AddressDTO addressDTO;
    private CreatePostDTO createPostDTO;
}
