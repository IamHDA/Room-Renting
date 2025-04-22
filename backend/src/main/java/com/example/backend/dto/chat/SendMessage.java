package com.example.backend.dto.chat;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class SendMessage {
    private long recipientId;
    private long senderId;
    private String content;
    private List<String> base64File;
}
