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

    @GetMapping("/newPosts")
    public ResponseEntity<List<PostSummaryDTO>> getNewPosts(){
        return ResponseEntity.ok(postService.getNewPosts());
    }

    @GetMapping("/specificPost/{id}")
    public ResponseEntity<PostDTO> getPost(@PathVariable("id") long postId){
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
    public ResponseEntity<PostSummaryList> getPostByCriteria(
            @RequestParam(name = "detail", defaultValue = "") String detail,
            @RequestParam(name = "ward", defaultValue = "") String ward,
            @RequestParam(name = "district", defaultValue = "") String district,
            @RequestParam(name = "city", defaultValue = "") String city,
            @RequestParam(name = "minPrice", defaultValue = "0") double minPrice,
            @RequestParam(name = "maxPrice", defaultValue = "0") double maxPrice,
            @RequestParam(name = "minArea", defaultValue = "0") double minArea,
            @RequestParam(name = "maxArea", defaultValue = "0") double maxArea,
            @RequestParam(name = "furniture", defaultValue = "") String furniture,
            @RequestParam(name = "sortCondition", defaultValue = "createdAt desc") String sortCondition,
            @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber
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
                    .pageNumber(pageNumber)
                .build();
        return ResponseEntity.ok(postService.getPostsByCriteria(filter));
    }

    @RequestMapping("postDetail/findById/{id}")
    public ResponseEntity<PostDetailDTO> getPostDetailById(@PathVariable long id){
        return ResponseEntity.ok(postService.getPostDetail(id));
    }

    @PostMapping("/create")
    public ResponseEntity<String> postCreate(@RequestPart(name = "post") PostCreateRequest postCreateRequest, @RequestPart(name = "file") List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(postService.createPostWithRollBack(postCreateRequest.getAddressDTO(), postCreateRequest.getCreatePostDTO(), files));
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
