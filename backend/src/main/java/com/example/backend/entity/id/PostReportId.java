package com.example.backend.entity.id;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class PostReportId {
    public PostReportId(long postId, long reportId) {
        this.postId = postId;
        this.reportId = reportId;
    }

    private long postId;
    private long reportId;
}
