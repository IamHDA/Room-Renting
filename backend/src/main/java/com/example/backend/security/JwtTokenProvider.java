package com.example.backend.security;

import com.example.backend.entity.mySQL.Account;
import com.example.backend.repository.mySQL.TokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtTokenProvider {

    @Autowired
    private TokenRepository tokenRepo;

    private SecretKey secretKey = Jwts.SIG.HS256.key().build();
    private String secretString = Encoders.BASE64URL.encode(secretKey.getEncoded());

    public JwtTokenProvider(TokenRepository tokenRepo) {
        this.tokenRepo = tokenRepo;
    }

    public String generateAccessToken(Account account){
        return generateToken(account, 1000 * 1000 * 5);
    }

    public String generateRefreshToken(Account account){
        return generateToken(account, 1000 * 1000 * 60 * 3);
    }

    public String generateToken(Account account, long expireTime) {
        return Jwts.builder()
                .subject(account.getIdentifier())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(getKey())
                .compact();
    }

    public SecretKey getKey(){
        byte[] keyBytes = Decoders.BASE64URL.decode(secretString);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Claims extractAllClaims(String token){
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String extractAccountIdentifier(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isValidAccessToken(String token, Account account){
        String identifier = extractAccountIdentifier(token);
        boolean isValidAccessToken = tokenRepo.findByAccessToken(token).map(t -> !t.isLoggedOut()).orElse(false);
        return String.valueOf(account.getIdentifier()).equals(identifier) && !isTokenExpired(token) && isValidAccessToken;
    }

    public boolean isValidRefreshToken(String token, Account account) {
        String identifier = extractAccountIdentifier(token);
        boolean isValidRefreshToken = tokenRepo.findByRefreshToken(token).map(t -> !t.isLoggedOut()).orElse(false);
        return String.valueOf(account.getIdentifier()).equals(identifier) && !isTokenExpired(token) && isValidRefreshToken;
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
