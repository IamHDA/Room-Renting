package com.example.backend.service.implement;

import com.example.backend.Enum.MessageStatus;
import com.example.backend.dto.chat.*;
import com.example.backend.entity.mongoDB.ChatRoom;
import com.example.backend.entity.mongoDB.Message;
import com.example.backend.entity.mongoDB.MessageMedia;
import com.example.backend.repository.mongoDB.ChatRoomRepository;
import com.example.backend.repository.mongoDB.MessageRepository;
import com.example.backend.service.ChatRoomService;
import com.example.backend.service.MessageMediaService;
import com.example.backend.service.MessageService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class MessageServiceImp implements MessageService {
    @Autowired
    private ChatRoomService chatRoomService;
    @Autowired
    private MessageRepository messageRepo;
    @Autowired
    private MessageMediaService messageMediaService;
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
            if(messageDTO.getContent().isBlank()) lastMessage.setContent("Đã gửi một file");
            if(message.getSenderId() == chatRoom.getSenderId()) lastMessage.setStatus(MessageStatus.SEEN);
            else lastMessage.setStatus(MessageStatus.UNSEEN);
            chatRoom.setLastMessage(lastMessage);
        });
        chatRoomRepo.saveAll(chatRooms);
        return modelMapper.map(message, MessageDTO.class);
    }

    @Transactional
    @Override
    public String revokeMessage(String messageId, String chatId) {
        Message message = messageRepo.findById(messageId).orElse(null);
        List<MessageMedia> messageMediaList = message.getMediaList();
        if(!messageMediaList.isEmpty()) messageMediaService.deleteMessageMedias(messageMediaList);
        message.setContent("Đã thu hồi tin nhắn");
        message.setMediaList(new ArrayList<>());
        messageRepo.save(message);
        Message newestMessage = messageRepo.findFirstByChatIdOrderByCreatedAtDesc(chatId);
        if(messageId.equals(newestMessage.getId())){
            List<ChatRoom> chatRooms = chatRoomRepo.findByChatId(chatId);
            chatRooms.forEach(chatRoom -> chatRoom.setLastMessage(modelMapper.map(message, LastMessage.class)));
            chatRoomRepo.saveAll(chatRooms);
        }
        return "Message revoked successfully!";
    }

    @Override
    public String getLastMessageIdByChatId(String chatId) {
        return messageRepo.findFirstByChatIdOrderByCreatedAtDesc(chatId).getId();
    }
}
