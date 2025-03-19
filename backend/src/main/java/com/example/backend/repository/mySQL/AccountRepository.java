package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Account;
import com.example.backend.entity.mySQL.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByIdentifier(String username);
}
