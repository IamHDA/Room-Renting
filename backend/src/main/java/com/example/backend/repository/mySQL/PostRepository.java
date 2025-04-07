package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("select MAX(p.id) from Post p")
    Long findLastPostId();
}
