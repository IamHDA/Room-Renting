package com.example.backend.entity.id;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class UserReportId {
    private long userId;
    private long reportId;
}
