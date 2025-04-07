package com.example.backend.dto;

import lombok.Data;

@Data
public class CreatePostDTO {
    private String title;
    private String description;
    private double price;
    private double area;
    private String bedroom;
    private String bathroom;
    private String water;
    private String electric;
    private String parking;
    private String wifi;
}
