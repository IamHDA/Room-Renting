package com.example.backend.dto.chat;

import com.example.backend.dto.user.UserHeader;
import lombok.Builder;
import lombok.Data;

@Data
public class ChatRoomDTO {
    private String id;
    private String chatId;
    private UserHeader recipient;
    private LastMessage lastMessage;
    private ChatRoomPost chatRoomPost;
}
