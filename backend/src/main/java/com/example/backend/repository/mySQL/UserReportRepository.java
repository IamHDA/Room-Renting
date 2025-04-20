package com.example.backend.repository.mySQL;

import com.example.backend.entity.id.UserReportId;
import com.example.backend.entity.mySQL.User;
import com.example.backend.entity.mySQL.UserReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserReportRepository extends JpaRepository<UserReport, UserReportId> {
    @Query("""
    select ur from UserReport ur
    where ur.user = :reported and ur.report.name = :reportName and ur.report.reporter = :reporter
""")
    Optional<UserReport> findSameUserReport(
            @Param("reported") User reported,
            @Param("reportName") String reportName,
            @Param("reporter") User reporter
    );
    long countByUser(User user);
    List<UserReport> findByUser(User user);
}
