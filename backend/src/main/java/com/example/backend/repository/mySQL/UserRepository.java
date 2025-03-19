package com.example.backend.repository.mySQL;

import com.example.backend.Enum.Role;
import com.example.backend.entity.mySQL.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
