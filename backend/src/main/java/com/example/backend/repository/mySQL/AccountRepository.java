package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Account;
import com.example.backend.entity.mySQL.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByIdentifier(String identifier);
    List<Account> findByUser(User user);
}
