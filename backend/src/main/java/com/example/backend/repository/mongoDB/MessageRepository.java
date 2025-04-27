package com.example.backend.repository.mongoDB;

import com.example.backend.dto.chat.MessageDTO;
import com.example.backend.entity.mongoDB.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByChatId(String chatId);
    Message findFirstByChatIdOrderByCreatedAtDesc(String chatId);
}
