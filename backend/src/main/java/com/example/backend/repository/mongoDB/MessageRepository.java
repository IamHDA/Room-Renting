package com.example.backend.repository.mongoDB;

import com.example.backend.entity.mongoDB.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
}
