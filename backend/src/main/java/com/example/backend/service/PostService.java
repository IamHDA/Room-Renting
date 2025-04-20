package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.dto.filter.AdminPostFilter;
import com.example.backend.dto.filter.PostFilter;
import com.example.backend.dto.post.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService {
    List<PostSummaryDTO> getNewPosts();
    PostDTO getPost(long postId);
    List<PostSummaryDTO> getEnablePostsByUser(long userId);
    List<PostSummaryDTO> getDisablePostsByUser(long userId);
    PostDetailDTO getPostDetail(long postId);
    List<PostSummaryDTO> getPostsByCriteria(PostFilter filter);
    void uploadPostMedia(List<MultipartFile> images, long postId) throws IOException;
    long createPost(AddressDTO addressDTO, CreatePostDTO createPostDTO);
    String changePostStatus(long postId, String status);
    String deletePost(long postId);
    String changePostInformation(ChangePostInformation changePostInformation);
}
