package com.example.backend.controller;

import com.example.backend.dto.TotalRating;
import com.example.backend.service.UserRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userRating")
public class UserRatingController {

    @Autowired
    private UserRatingService userRatingService;

    @GetMapping("/totalRating/{reviewedId}")
    public ResponseEntity<TotalRating> getTotalRating(@PathVariable long reviewedId){
        return ResponseEntity.ok(userRatingService.getTotalRating(reviewedId));
    }

    @GetMapping("/userRate/{reviewedId}")
    public ResponseEntity<Integer> getUserRate(@PathVariable long reviewedId){
        return ResponseEntity.ok(userRatingService.getUserRate(reviewedId));
    }

    @PostMapping("/postRate")
    public ResponseEntity<String> postRateUser(@RequestParam long reviewedId, @RequestParam int rate){
        return ResponseEntity.ok(userRatingService.rateUser(reviewedId, rate));
    }

    @PutMapping("/putRate")
    public ResponseEntity<String> putRateUser(@RequestParam long reviewedId, @RequestParam int rate){
        return ResponseEntity.ok(userRatingService.rateUser(reviewedId, rate));
    }
}
