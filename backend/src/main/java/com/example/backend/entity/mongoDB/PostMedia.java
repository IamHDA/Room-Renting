package com.example.backend.entity.mongoDB;

import com.example.backend.Enum.MediaType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "post_media")
@Data
@Builder
@AllArgsConstructor
public class PostMedia {
    @Id
    private String id;
    private long postId;
    private String url;
    private MediaType type;
}
