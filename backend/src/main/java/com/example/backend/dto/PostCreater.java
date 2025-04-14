package com.example.backend.dto;

import com.example.backend.Enum.UserStatus;
import lombok.Data;

@Data
public class PostCreater {
    public long id;
    public String fullName;
    public byte[] avatar;
    public int totalPosts;
    public int joinTime;
    public String phoneNumber;
    public String status;
}
