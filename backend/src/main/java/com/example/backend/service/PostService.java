package com.example.backend.service;

import com.example.backend.dto.AddressDTO;
import com.example.backend.dto.CreatePostDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService {
    void uploadPostMedia(List<MultipartFile> images, long postId) throws IOException;
    long createPost(AddressDTO addressDTO, CreatePostDTO createPostDTO);
}
