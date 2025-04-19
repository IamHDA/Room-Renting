package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    long count();
    @Query("""
    select r from Report r
    where month(r.createdAt) = :month
""")
    long countByThisMonth(@Param("month") int month);
    @Query("""
    select r from Report r
    where day(r.createdAt) = :day
""")
    long countByThisDay(@Param("day") int day);
}
