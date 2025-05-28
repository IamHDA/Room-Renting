package com.example.backend.dto.chat;

import com.example.backend.Enum.MediaType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageMediaDTO {
    private String id;
    private String url;
    private String name;
    private String filePath;
    private MediaType type;
}
