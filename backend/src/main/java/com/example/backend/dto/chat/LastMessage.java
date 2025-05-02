package com.example.backend.dto.chat;

import com.example.backend.Enum.MessageStatus;
import lombok.Data;

import java.time.Instant;

@Data
public class LastMessage {
    private long senderId;
    private Instant createdAt;
    private MessageStatus status;
    private String content;
}
