package com.example.backend.dto.chat;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostChat {
    private long id;
    private String title;
    private String thumbnailURL;
    private double price;
    private double area;
}
