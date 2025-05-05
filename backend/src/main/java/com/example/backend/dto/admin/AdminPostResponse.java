package com.example.backend.dto.admin;

import lombok.Data;

import java.util.List;

@Data
public class AdminPostResponse {
    private List<AdminPostRow> posts;
    private long totalLength;
}
