package com.example.backend.service.implement;

import com.example.backend.dto.chat.MessageDTO;
import com.example.backend.dto.chat.SendMessage;
import com.example.backend.entity.mongoDB.ChatRoom;
import com.example.backend.entity.mongoDB.Message;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mongoDB.ChatRoomRepository;
import com.example.backend.repository.mongoDB.MessageMediaRepository;
import com.example.backend.repository.mongoDB.MessageRepository;
import com.example.backend.service.ChatRoomService;
import com.example.backend.service.MessageService;
import com.example.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.List;

@Service
public class MessageServiceImp implements MessageService {
    @Autowired
    private ChatRoomService chatRoomService;
    @Autowired
    private MessageRepository messageRepo;
    @Autowired
    private ChatRoomRepository chatRoomRepo;
    @Autowired
    private MessageMediaRepository messageMediaRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;

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
                .created_at(Instant.now())
                .build());
        List<ChatRoom> chatRooms = chatRoomRepo.findByChatId(chatId);
        chatRooms.forEach(chatRoom -> {
            chatRoom.setLastMessageId(message.getId());
        });
        chatRoomRepo.saveAll(chatRooms);
//        try {
//            uploadMessageImage(messageDTO.getBase64Files(), message.getId());
//        }catch (Exception e){
//            messageRepo.deleteById(message.getId());
//            throw new RuntimeException();
//        }
        return modelMapper.map(message, MessageDTO.class);
    }

//    @Override
//    public void uploadMessageImage(List<String> base64Files, String messageId) throws IOException {
//        for(MultipartFile file : files){
//            String url = "http://localhost:8080/MessageMedia/";
//            String mediaUrl = url + file.getOriginalFilename();
//            String tmp = file.getContentType().split("/")[0];
//            MediaType type = MediaType.valueOf(tmp.toUpperCase());
//            messageMediaRepo.save(MessageMedia.builder()
//                    .type(type)
//                    .url(mediaUrl)
//                    .messageId(messageId)
//                    .build());
//            file.transferTo(new File("/home/iamhda/ETC/Room-Renting/backend/src/main/resources/static/MessageMedia/" + file.getOriginalFilename()));
//        }
//
//    }
}
