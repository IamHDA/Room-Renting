package com.example.backend.repository.mySQL;

import com.example.backend.entity.id.FavouritePostId;
import com.example.backend.entity.mySQL.FavouritePost;
import com.example.backend.entity.mySQL.Post;
import com.example.backend.entity.mySQL.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Repository
public interface FavouritePostRepository extends JpaRepository<FavouritePost, FavouritePostId> {
    List<FavouritePost> findByUser(User user);
    void deleteByPost_IdAndUser(long id, User user);
    List<FavouritePost> findByUserOrderByCreatedAtDesc(User user);
    List<FavouritePost> findByUserOrderByCreatedAtAsc(User user);
    List<FavouritePost> findByUserOrderByPostPostDetailPriceAsc(User user);
    List<FavouritePost> findByUserOrderByPostPostDetailPriceDesc(User user);
}
