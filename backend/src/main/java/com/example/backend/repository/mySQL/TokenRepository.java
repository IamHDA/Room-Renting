package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

    List<Token> findByAccount_IdAndLoggedOutFalse(long accountId);
    Token findFirstByAccount_IdOrderByCreatedAtDesc (long accountId);
    Optional<Token> findByAccessToken(String token);
    Optional<Token> findByRefreshToken(String token);
}
