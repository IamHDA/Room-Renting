package com.example.backend.entity.id;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class UserReportId {
    public UserReportId(long userId, long reportId) {
        this.userId = userId;
        this.reportId = reportId;
    }

    private long userId;
    private long reportId;
}
