package com.example.backend.entity.mongoDB;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "chat_room")
public class ChatRoom {
    @Id
    private String id;
    private String chatId;
    private String lastMessageId;
    private long senderId;
    private long recipientId;
}
