package com.example.backend.Enum;

public enum PostStatus {
    ENABLED("Enable"),
    DISABLED("Disable");

    private final String displayName;

    PostStatus(String displayName){
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
