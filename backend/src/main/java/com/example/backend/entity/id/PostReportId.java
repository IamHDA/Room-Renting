package com.example.backend.entity.id;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class PostReportId {
    private long postId;
    private long reportId;
}
