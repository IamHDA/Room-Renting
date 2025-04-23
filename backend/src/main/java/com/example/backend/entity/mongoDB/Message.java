package com.example.backend.entity.mongoDB;

import com.example.backend.Enum.ChatStatus;
import lombok.Builder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "message")
@Data
@Builder
public class Message {
    @Id
    private String id;
    private long senderId;
    private long recipientId;
    private String chatId;
    private String content;
    private ChatStatus status;
    @CreatedDate
    private Instant created_at;
}
