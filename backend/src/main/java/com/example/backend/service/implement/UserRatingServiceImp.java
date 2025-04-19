package com.example.backend.service.implement;

import com.example.backend.dto.TotalRating;
import com.example.backend.entity.mySQL.User;
import com.example.backend.entity.mySQL.UserRating;
import com.example.backend.repository.mySQL.UserRatingRepository;
import com.example.backend.repository.mySQL.UserRepository;
import com.example.backend.service.UserRatingService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class UserRatingServiceImp implements UserRatingService {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private UserRatingRepository userRatingRepo;

    @Override
    public TotalRating getTotalRating(long reviewedId) {
        return userRatingRepo.findUserTotalRating(reviewedId);
    }


    @Override
    public String rateUser(long reviewedId, int rate) {
        User reviewer = userService.getCurrentUser();
        User reviewed = userRepo.findById(reviewedId).orElse(null);
        AtomicBoolean hasRated = new AtomicBoolean(true);
        UserRating userRating = userRatingRepo.findByReviewedAndReviewer(reviewed, reviewer).orElseGet(() -> {
            UserRating tmp = new UserRating();
            tmp.setCreatedAt(LocalDateTime.now());
            tmp.setReviewer(reviewer);
            tmp.setReviewed(reviewed);
            hasRated.set(false);
            return tmp;
        });
        if(hasRated.get()) userRating.setUpdatedAt(LocalDateTime.now());
        userRating.setRating(rate);
        userRatingRepo.save(userRating);
        return "User rated successfully";
    }

    @Override
    public int getUserRate(long reviewedId) {
        User reviewer = userService.getCurrentUser();
        UserRating userRating = userRatingRepo.findByReviewed_IdAndReviewer(reviewedId, reviewer);
        if(userRating == null) return 0;
        return userRating.getRating();
    }
}
