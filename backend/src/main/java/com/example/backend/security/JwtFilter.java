package com.example.backend.security;

import com.example.backend.entity.mySQL.Account;
import com.example.backend.repository.mySQL.AccountRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Configuration
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AccountRepository accountRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String authHeader = request.getHeader("Authorization");
            String accessToken = null;
            String accountIdentifer = null;
            if(authHeader != null && authHeader.startsWith("Bearer ")){
                accessToken = authHeader.substring(7);
                accountIdentifer = jwtTokenProvider.extractAccountIdentifier(accessToken);
            }

            if(accountIdentifer != null && SecurityContextHolder.getContext().getAuthentication() == null){
                Account account = accountRepo.findByIdentifier(accountIdentifer).orElse(null);
                UserDetails userDetails = userDetailsService.loadUserByUsername(accountIdentifer);
                if(jwtTokenProvider.isValidAccessToken(accessToken, account)){
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }catch(ExpiredJwtException e){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("AccessToken expired!");
            return;
        }
        filterChain.doFilter(request, response);
    }
}
