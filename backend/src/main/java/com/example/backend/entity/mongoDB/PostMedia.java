package com.example.backend.entity.mongoDB;

import com.example.backend.Enum.MediaType;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "post_media")
@Data
public class PostMedia {
    @Id
    private String id;
    private String postId;
    private String url;
    private MediaType type;
}
