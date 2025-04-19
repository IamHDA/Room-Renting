package com.example.backend.repository.mySQL;

import com.example.backend.dto.TotalRating;
import com.example.backend.entity.mySQL.User;
import com.example.backend.entity.mySQL.UserRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface UserRatingRepository extends JpaRepository<UserRating, Long> {
    Optional<UserRating> findByReviewedAndReviewer(User reviewed, User reviewer);

    @Query("""
    select new com.example.backend.dto.TotalRating(sum(ur.rating), count(ur))
    from UserRating ur
    where ur.reviewed.id = :userId
""")
    TotalRating findUserTotalRating(@Param("userId") long userId);

    UserRating findByReviewed_IdAndReviewer(long reviewedId, User reviewer);
}
