package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

    List<Token> findByAccountIdAndLoggedOutFalse(long accountId);

    Optional<Token> findByAccessToken(String token);
    Optional<Token> findByRefreshToken(String token);
}
