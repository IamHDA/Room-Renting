package com.example.backend.controller;

import com.example.backend.dto.filter.PostFilter;
import com.example.backend.dto.post.*;
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

    @GetMapping("/totalPosts")
    private ResponseEntity<PostStats> getTotalPosts(){
        PostStats postStats = PostStats.builder()
                .totalPosts(postService.getTotalPost())
                .totalPostsThisMonth(postService.getTotalPostThisMonth())
                .totalPostsThisDay(postService.getTotalPostThisDay())
                .build();
        return ResponseEntity.ok(postStats);
    }

    @GetMapping("/newPosts")
    private ResponseEntity<List<PostSummaryDTO>> getNewPosts(){
        return ResponseEntity.ok(postService.getNewPosts());
    }

    @GetMapping("/specificPost/{id}")
    private ResponseEntity<PostDTO> getPost(@PathVariable("id") long postId){
        return ResponseEntity.ok(postService.getPost(postId));
    }

    @GetMapping("/userEnablePosts/{userId}")
    public ResponseEntity<List<PostSummaryDTO>> getEnablePostsByUser(@PathVariable long userId) {
        return ResponseEntity.ok(postService.getEnablePostsByUser(userId));
    }

    @GetMapping("/userDisablePosts/{userId}")
    public ResponseEntity<List<PostSummaryDTO>> getDisablePostsByUser(@PathVariable long userId) {
        return ResponseEntity.ok(postService.getDisablePostsByUser(userId));
    }

    @GetMapping("/postsByCriteria")
    public ResponseEntity<List<PostSummaryDTO>> getPostByCriteria(
            @RequestParam(name = "detail") String detail,
            @RequestParam(name = "ward") String ward,
            @RequestParam(name = "district") String district,
            @RequestParam(name = "city") String city,
            @RequestParam(name = "minPrice") double minPrice,
            @RequestParam(name = "maxPrice") double maxPrice,
            @RequestParam(name = "minArea") double minArea,
            @RequestParam(name = "maxArea") double maxArea,
            @RequestParam(name = "furniture") String furniture,
            @RequestParam(name = "sortCondition") String sortCondition
    ){
        PostFilter filter = PostFilter.builder()
                .addressDetail(detail)
                .addressWard(ward)
                .addressDistrict(district)
                .addressCity(city)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .minArea(minArea)
                .maxArea(maxArea)
                .furniture(furniture)
                .sortCondition(sortCondition)
                .build();
        return ResponseEntity.ok(postService.getPostsByCriteria(filter));
    }

    @RequestMapping("postDetail/findById/{id}")
    public ResponseEntity<PostDetailDTO> getPostDetailById(@PathVariable long id){
        return ResponseEntity.ok(postService.getPostDetail(id));
    }

    @PostMapping("/create")
    public ResponseEntity<String> postCreate(@RequestPart(name = "post") PostCreateRequest postCreateRequest, @RequestPart(name = "file") List<MultipartFile> files) throws IOException {
        long postId = postService.createPost(postCreateRequest.getAddressDTO(), postCreateRequest.getCreatePostDTO());
        postService.uploadPostMedia(files, postId);
        return ResponseEntity.ok("Post created");
    }

    @PutMapping("/changeStatus")
    public ResponseEntity<String> changeStatus(@RequestParam long postId, @RequestParam String status){
        return ResponseEntity.ok(postService.changePostStatus(postId, status));
    }

    @PutMapping("/changeInformation")
    public ResponseEntity<String> changePostInformation(@RequestBody ChangePostInformation changePostInformation){
        return ResponseEntity.ok(postService.changePostInformation(changePostInformation));
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable long postId){
        return ResponseEntity.ok(postService.deletePost(postId));
    }
}
