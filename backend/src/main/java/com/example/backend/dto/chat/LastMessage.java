package com.example.backend.dto.chat;

import com.example.backend.Enum.ChatStatus;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
public class LastMessage {
    private long senderId;
    private Instant createdAt;
    private ChatStatus status;
    private String content;
}
