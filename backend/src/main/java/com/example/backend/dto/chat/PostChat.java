package com.example.backend.dto.chat;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostChat {
    private String title;
    private String thumbnailURL;
    private double price;
}
