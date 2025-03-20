package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByIdentifier(String identifier);
    String getIdentifierById(long accountId);
}
