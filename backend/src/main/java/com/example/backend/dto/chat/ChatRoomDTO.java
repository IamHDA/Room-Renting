package com.example.backend.dto.chat;

import com.example.backend.dto.user.UserHeader;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class ChatRoomDTO {
    private UserHeader recipient;
    private String chatId;
    private PostChat postChat;
}
