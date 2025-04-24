package com.example.backend.entity.mongoDB;

import com.example.backend.dto.chat.ChatRoomPost;
import com.example.backend.dto.chat.LastMessage;
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
    private LastMessage lastMessage;
    private ChatRoomPost chatRoomPost;
    private long senderId;
    private long recipientId;
}
