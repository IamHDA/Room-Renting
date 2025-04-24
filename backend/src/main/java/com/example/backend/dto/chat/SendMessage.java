package com.example.backend.dto.chat;

import lombok.Data;

import java.util.List;

@Data
public class SendMessage {
    private long recipientId;
    private long senderId;
    private List<MessageMediaDTO> mediaList;
    private String content;
}
