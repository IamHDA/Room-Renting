package com.example.backend.service.implement;

import com.example.backend.dto.chat.ChatRoomDTO;
import com.example.backend.dto.chat.ChatRoomPost;
import com.example.backend.dto.user.UserHeader;
import com.example.backend.entity.mongoDB.ChatRoom;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mongoDB.ChatRoomRepository;
import com.example.backend.repository.mongoDB.PostMediaRepository;
import com.example.backend.repository.mySQL.PostRepository;
import com.example.backend.repository.mySQL.UserRepository;
import com.example.backend.service.ChatRoomService;
import com.example.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatRoomServiceImp implements ChatRoomService {
    @Autowired
    private ChatRoomRepository chatRoomRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private PostMediaRepository postMediaRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Optional<String> getChatRoomId(long senderId, long recipientId, boolean createIfNotExist) {
        return chatRoomRepo.findBySenderIdAndRecipientId(senderId, recipientId)
                .map(ChatRoom::getChatId)
                .or(() -> {
                    if(createIfNotExist){
                        String chatId = createChatId(senderId, recipientId);
                        return Optional.of(chatId);
                    }
                    return Optional.empty();
                });
    }

    private String createChatId(long senderId, long recipientId){
        String chatId = String.format("%d_%d", senderId, recipientId);
        ChatRoom senderRecipient = ChatRoom.builder()
                .senderId(senderId)
                .recipientId(recipientId)
                .chatId(chatId)
                .build();
        ChatRoom recipientSender = ChatRoom.builder()
                .senderId(recipientId)
                .recipientId(senderId)
                .chatId(chatId)
                .build();
        chatRoomRepo.save(recipientSender);
        chatRoomRepo.save(senderRecipient);
        return chatId;
    }

    @Override
    public List<ChatRoomDTO> findBySender() {
        User currentUser = userService.getCurrentUser();
        Sort sort = Sort.by(Sort.Order.desc("lastMessage.createdAt"));
        return chatRoomRepo.findBySenderId(currentUser.getId(), sort)
                .stream()
                .map(chatRoom -> {
                    UserHeader recipient = modelMapper.map(userRepo.findById(chatRoom.getRecipientId()), UserHeader.class);
                    return ChatRoomDTO.builder()
                            .chatRoomPost(chatRoom.getPost())
                            .lastMessage(chatRoom.getLastMessage())
                            .recipient(recipient)
                            .chatId(chatRoom.getChatId())
                            .build() ;
                }).toList();
    }

    @Override
    public String updateChatRoomPost(ChatRoomPost chatRoomPost, String chatId) {
        List<ChatRoom> chatRooms = chatRoomRepo.findByChatId(chatId);
        chatRooms.forEach(chatRoom -> chatRoom.setPost(chatRoomPost));
        chatRoomRepo.saveAll(chatRooms);
        return "Update chat room post successfully";
    }
}
