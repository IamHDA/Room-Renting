package com.example.backend.controller;

import com.example.backend.dto.post.PostSummaryDTO;
import com.example.backend.service.FavouritePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favouritePost")
public class FavouritePostController {
    @Autowired
    private FavouritePostService favouritePostService;

    @GetMapping("/getFavPostIdsByUser")
    public ResponseEntity<List<Long>> getFavouritePostsIdByUser() {
        return ResponseEntity.ok(favouritePostService.getFavouritePostsIdByUser());
    }

    @GetMapping("/getFavPostsByUser")
    public ResponseEntity<List<PostSummaryDTO>> getFavouritePostsByUser(@RequestParam("order") int order) {
        return ResponseEntity.ok(favouritePostService.getFavouritePostsByUser(order));
    }

    @PostMapping("/create/{id}")
    public ResponseEntity<String> addToFavourite(@PathVariable("id") long postId) {
        return ResponseEntity.ok(favouritePostService.addToFavourite(postId));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFavourite(@PathVariable("id") long postId) {
        return ResponseEntity.ok(favouritePostService.deleteFromFavourite(postId));
    }
}
