package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WardRepository extends JpaRepository<Ward, Integer> {
}
