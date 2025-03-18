package com.example.backend.entity.mongoDB;

import org.springframework.data.annotation.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "post_video")
@Data
public class PostVideo {
    @Id
    private String id;
    private long postId;
    private List<String> url;
}
