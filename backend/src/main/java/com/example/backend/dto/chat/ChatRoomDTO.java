package com.example.backend.dto.chat;

import com.example.backend.dto.user.UserHeader;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatRoomDTO {
    private UserHeader recipient;
    private String chatId;
    private LastMessage lastMessage;
    private ChatRoomPost chatRoomPost;
}
