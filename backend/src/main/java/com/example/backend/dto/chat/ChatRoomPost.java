package com.example.backend.dto.chat;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatRoomPost {
    private long id;
    private String title;
    private String thumbnailUrl;
    private double price;
    private double area;
}
