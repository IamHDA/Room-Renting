package com.example.backend.dto.chat;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class LastMessage {
    private long senderId;
    private Instant createdAt;
    private String content;
}
