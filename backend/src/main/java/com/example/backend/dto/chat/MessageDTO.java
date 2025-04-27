package com.example.backend.dto.chat;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private String id;
    private String chatId;
    private long senderId;
    private long recipientId;
    private String content;
    private List<MessageMediaDTO> mediaList;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm, dd/MM/yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Instant createdAt;
}
