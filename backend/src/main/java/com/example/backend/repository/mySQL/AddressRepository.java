package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
