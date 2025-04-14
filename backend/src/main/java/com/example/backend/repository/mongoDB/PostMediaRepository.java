package com.example.backend.repository.mongoDB;

import com.example.backend.entity.mongoDB.PostMedia;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PostMediaRepository extends MongoRepository<PostMedia, String> {
    PostMedia findFirstByPostId(long postId);
    List<PostMedia> findByPostId(long id);
}
