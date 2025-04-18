package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WardRepository extends JpaRepository<Ward, Integer> {
    List<Ward> findByDistrict_Id(int id);
    Ward findById(int id);
    Ward findByName(String name);
}
