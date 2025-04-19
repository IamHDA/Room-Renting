package com.example.backend.entity.mySQL;

import com.example.backend.entity.id.PostReportId;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class PostReport {
    public PostReport(Post post, Report report){
        this.post = post;
        this.report = report;
        this.id = new PostReportId(post.getId(), report.getId());
    }

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
