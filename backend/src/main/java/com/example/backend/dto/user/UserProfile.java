package com.example.backend.dto.user;

import com.example.backend.dto.TotalRating;
import lombok.Data;

@Data
public class UserProfile {
    private long id;
    private String fullName;
    private String phoneNumber;
    private byte[] avatar;
    private byte[] backgroundImage;
    private String status;
    private int joinTime;
    private TotalRating totalRating;
    private String addressDTO;
}
