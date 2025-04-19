package com.example.backend.dto.post;

import lombok.Data;

@Data
public class PostCreator {
    public long id;
    public String fullName;
    public byte[] avatar;
    public int totalPosts;
    public int joinTime;
    public String phoneNumber;
    public String status;
}
