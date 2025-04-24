package com.example.backend.repository.mongoDB;

import com.example.backend.entity.mongoDB.MessageMedia;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageMediaRepository extends MongoRepository<MessageMedia, String> {
}
