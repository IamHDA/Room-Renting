package com.example.backend.controller;

import com.example.backend.dto.AddressDTO;
import com.example.backend.dto.CreatePostDTO;
import com.example.backend.dto.PostCreateRequest;
import com.example.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping("/create")
    public ResponseEntity<String> postCreate(@RequestPart(name = "post") PostCreateRequest postCreateRequest, @RequestPart(name = "file") List<MultipartFile> files) throws IOException {
        long postId = postService.createPost(postCreateRequest.getAddressDTO(), postCreateRequest.getCreatePostDTO());
        postService.uploadPostMedia(files, postId);
        return ResponseEntity.ok("Post created");
    }
}
