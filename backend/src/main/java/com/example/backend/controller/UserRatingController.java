package com.example.backend.controller;

import com.example.backend.service.UserRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userRating")
public class UserRatingController {

    @Autowired
    private UserRatingService userRatingService;

    @GetMapping("/userRate")
    public ResponseEntity<Integer> getUserRate(@RequestParam long reviewerId, @RequestParam long reviewedId) {
        return ResponseEntity.ok(userRatingService.getUserRate(reviewerId, reviewedId));
    }

    @PostMapping("/postRate")
    public ResponseEntity<String> postRateUser(@RequestParam long reviewerId, @RequestParam long reviewedId, @RequestParam int rate){
        return ResponseEntity.ok(userRatingService.rateUser(reviewerId, reviewedId, rate));
    }

    @PutMapping("/putRate")
    public ResponseEntity<String> putRateUser(@RequestParam long reviewerId, @RequestParam long reviewedId, @RequestParam int rate){
        return ResponseEntity.ok(userRatingService.rateUser(reviewerId, reviewedId, rate));
    }
}
