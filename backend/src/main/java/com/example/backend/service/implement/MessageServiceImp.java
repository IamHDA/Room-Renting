package com.example.backend.service.implement;

import com.example.backend.Enum.ChatStatus;
import com.example.backend.dto.chat.*;
import com.example.backend.entity.mongoDB.ChatRoom;
import com.example.backend.entity.mongoDB.Message;
import com.example.backend.entity.mongoDB.MessageMedia;
import com.example.backend.repository.mongoDB.ChatRoomRepository;
import com.example.backend.repository.mongoDB.MessageRepository;
import com.example.backend.service.ChatRoomService;
import com.example.backend.service.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.List;

@Slf4j
@Service
public class MessageServiceImp implements MessageService {
    @Autowired
    private ChatRoomService chatRoomService;
    @Autowired
    private MessageRepository messageRepo;
    @Autowired
    private ChatRoomRepository chatRoomRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<MessageDTO> getMessagesByChatId(String chatId) {
        return messageRepo.findByChatId(chatId)
                .stream()
                .map(message -> modelMapper.map(message, MessageDTO.class))
                .toList() ;
    }

    @Override
    public MessageDTO sendMessage(SendMessage messageDTO) {
        String chatId = chatRoomService
                .getChatRoomId(messageDTO.getSenderId(), messageDTO.getRecipientId(), true)
                .orElse(null);
        Message message = messageRepo.save(Message.builder()
                        .chatId(chatId)
                        .senderId(messageDTO.getSenderId())
                        .recipientId(messageDTO.getRecipientId())
                        .content(messageDTO.getContent())
                        .mediaList(messageDTO.getMediaList()
                                .stream()
                                .map(messageMediaDTO -> modelMapper.map(messageMediaDTO, MessageMedia.class))
                                .toList()
                        )
                        .createdAt(Instant.now())
                .build());
        List<ChatRoom> chatRooms = chatRoomRepo.findByChatId(chatId);
        chatRooms.forEach(chatRoom -> {
            LastMessage lastMessage = modelMapper.map(message, LastMessage.class);
            if(message.getSenderId() == chatRoom.getSenderId()) lastMessage.setStatus(ChatStatus.SEEN);
            else lastMessage.setStatus(ChatStatus.UNSEEN);
            chatRoom.setLastMessage(lastMessage);
        });
        chatRoomRepo.saveAll(chatRooms);
        return modelMapper.map(message, MessageDTO.class);
    }


}
