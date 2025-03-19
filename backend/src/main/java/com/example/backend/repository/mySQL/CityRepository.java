package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Integer> {
}
