package com.example.backend.entity.mySQL;

import com.example.backend.entity.id.PostReportId;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PostReport {
    @EmbeddedId
    private PostReportId id;

    @MapsId("postId")
    @ManyToOne
    @JoinColumn(name = "reported_id")
    private Post post;

    @MapsId("reportId")
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "report_id")
    private Report report;
}
