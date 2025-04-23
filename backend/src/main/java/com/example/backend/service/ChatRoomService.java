package com.example.backend.service;

import com.example.backend.dto.chat.ChatRoomDTO;
import com.example.backend.dto.chat.ChatRoomPost;

import java.util.List;
import java.util.Optional;

public interface ChatRoomService {
    Optional<String> getChatRoomId(long senderId, long recipientId, boolean createIfNotExist);
    List<ChatRoomDTO> findBySender();

    String updateChatRoomPost(ChatRoomPost chatRoomPost, String chatId);
}
