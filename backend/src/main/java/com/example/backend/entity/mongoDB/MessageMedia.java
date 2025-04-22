package com.example.backend.entity.mongoDB;

import com.example.backend.Enum.MediaType;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "message_media")
@Data
@Builder
public class MessageMedia {
    @Id
    private String id;
    private String messageId;
    private String url;
    private MediaType type;
}
