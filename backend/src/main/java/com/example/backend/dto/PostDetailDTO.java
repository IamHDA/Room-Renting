package com.example.backend.dto;

import lombok.Data;

@Data
public class PostDetailDTO {
    private double price;
    private double area;
    private String bathroom;
    private String bedroom;
    private String water;
    private String electric;
    private String parking;
    private String wifi;
    private String security;
    private String furniture;
}
