package com.example.backend.dto.user;

import lombok.Data;

@Data
public class PostCreator {
    private long id;
    private String fullName;
    private byte[] avatar;
    private int totalPosts;
    private int joinTime;
    private String phoneNumber;
    private String status;
    private int replyPercentage;
}
