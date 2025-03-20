package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
}
