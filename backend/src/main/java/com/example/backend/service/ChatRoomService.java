package com.example.backend.service;

import com.example.backend.dto.chat.ChatRoomDTO;
import com.example.backend.dto.chat.ChatRoomPost;
import com.example.backend.dto.chat.ChatRoomSearch;

import java.util.List;
import java.util.Optional;

public interface ChatRoomService {
    Optional<String> getChatRoomId(long senderId, long recipientId, boolean createIfNotExist);
    List<ChatRoomDTO> findBySender();
    List<ChatRoomDTO> searchChatRoomBySender(String keyword);
    String updateLastMessageStatus(String id);
    String updateChatRoomPost(ChatRoomPost chatRoomPost, String chatId);
    String deleteChatRooms(List<String> id);
}
