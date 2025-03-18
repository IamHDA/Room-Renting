package com.example.backend.entity.mongoDB;

import org.springframework.data.annotation.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "message_image")
@Data
public class MessageImage {
    @Id
    private String id;
    private String messageId;
    private List<String> url;
}
