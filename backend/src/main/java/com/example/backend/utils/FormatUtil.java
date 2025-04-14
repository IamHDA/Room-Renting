package com.example.backend.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.Map;

@Component
public class FormatUtil {
    public String textFormat(String text){
        return text.replace("\n", "<br>");
    }
    public int getJoinTime(LocalDateTime localDateTime) {
        LocalDateTime now = LocalDateTime.now();
        Instant instant1 = now.toInstant(ZoneOffset.of("+8"));
        Instant instant2 = localDateTime.toInstant(ZoneOffset.of("+8"));
        long miliseconds1 = instant1.toEpochMilli();
        long miliseconds2 = instant2.toEpochMilli();
        long diff = (miliseconds1 - miliseconds2) / (1000 * 60 * 60 * 24);
        if (diff == 0) return 1;
        return (int) diff;
    }
}
