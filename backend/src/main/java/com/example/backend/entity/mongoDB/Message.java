package com.example.backend.entity.mongoDB;

import org.springframework.data.annotation.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "message")
@Data
public class Message {
    @Id
    private String id;
    private long senderId;
    private long recipientId;
    private long chatRoomId;
    private String content;
    private Instant created_at;
}
