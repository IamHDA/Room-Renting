package com.example.backend.dto;

import com.example.backend.Enum.Provider;
import lombok.Data;

@Data
public class AccountDTO {
    private long id;
    private String identifier;
    private Provider provider;
}
