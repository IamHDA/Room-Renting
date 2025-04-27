package com.example.backend.dto.chat;

import lombok.Data;

@Data
public class RevokeRequest {
    private String chatId;
    private String messageId;
    private long senderId;
}
