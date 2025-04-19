package com.example.backend.entity.mySQL;

import com.example.backend.entity.id.UserReportId;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "user_report")
@NoArgsConstructor
public class UserReport {
    public UserReport(User user, Report report){
        this.user = user;
        this.report = report;
        this.id = new UserReportId(user.getId(), report.getId());
    }

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
