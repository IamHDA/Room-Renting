package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.District;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistrictRepository extends JpaRepository<District, Integer> {
}
