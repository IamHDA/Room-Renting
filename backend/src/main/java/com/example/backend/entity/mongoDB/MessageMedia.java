package com.example.backend.entity.mongoDB;

import com.example.backend.Enum.MediaType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "message_media")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageMedia {
    @Id
    private String id;
    private String url;
    private MediaType type;
}
