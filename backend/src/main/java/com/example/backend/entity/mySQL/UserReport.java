package com.example.backend.entity.mySQL;

import com.example.backend.entity.id.UserReportId;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "user_report")
public class UserReport {
    @EmbeddedId
    private UserReportId id;

    @MapsId("userId")
    @ManyToOne
    @JoinColumn(name = "reported_id")
    private User user;

    @MapsId("reportId")
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "report_id")
    private Report report;
}
