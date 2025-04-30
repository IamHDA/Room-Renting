package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByPhoneNumberOrEmail(String phoneNumber, String email);
    User findById(long userId);
    long count();
    @Query("""
    select count(u) from User u
    where month(u.createdAt) = :month
""")
    long countByThisMonth(@Param("month") int month);
    @Query("""
    select count(u) from User u
    where day(u.createdAt) = :day
""")
    long countByThisDay(@Param("day") int day);
}
