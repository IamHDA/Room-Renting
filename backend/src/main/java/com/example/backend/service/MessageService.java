package com.example.backend.service;

import com.example.backend.dto.chat.MessageDTO;
import com.example.backend.dto.chat.SendMessage;

import java.util.List;

public interface MessageService {
    List<MessageDTO> getMessagesByChatId(String chatId);
    MessageDTO sendMessage(SendMessage messageDTO);

    String revokeMessage(String messageId, String chatId);

    String getLastMessageIdByChatId(String chatId);
}
