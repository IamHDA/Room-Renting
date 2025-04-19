package com.example.backend.repository.mySQL;

import com.example.backend.entity.id.PostReportId;
import com.example.backend.entity.mySQL.Post;
import com.example.backend.entity.mySQL.PostReport;
import com.example.backend.entity.mySQL.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostReportRepository extends JpaRepository<PostReport, PostReportId> {
    @Query("""
    select pr from PostReport pr
    where pr.post = :post and pr.report.name = :reportName and pr.report.reporter = :reporter
""")
    Optional<PostReport> findSamePostReport(
            @Param("post") Post post,
            @Param("reportName") String reportName,
            @Param("reporter") User reporter
    );
}
