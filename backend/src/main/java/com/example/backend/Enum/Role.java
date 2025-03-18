package com.example.backend.Enum;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    USER("User"),
    ADMIN("Admin");

    private final String displayName;

    Role(String displayName){
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }
}
