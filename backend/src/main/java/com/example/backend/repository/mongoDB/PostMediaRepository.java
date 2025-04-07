package com.example.backend.repository.mongoDB;

import com.example.backend.entity.mongoDB.PostMedia;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostMediaRepository extends MongoRepository<PostMedia, String> {
}
