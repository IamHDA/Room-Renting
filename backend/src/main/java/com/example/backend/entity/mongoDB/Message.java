package com.example.backend.entity.mongoDB;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "message")
@Data
@Builder
public class Message {
    @Id
    private String id;
    private String chatId;
    private long senderId;
    private long recipientId;
    private String content;
    private Instant createdAt;
    private List<MessageMedia> mediaList;
}
