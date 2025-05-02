package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddNewAccount {
    private String identifier;
    private String password;
}
