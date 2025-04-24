package com.example.backend.repository.mongoDB;

import org.springframework.data.domain.Sort;
import com.example.backend.entity.mongoDB.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    Optional<ChatRoom> findBySenderIdAndRecipientId(long senderId, long recipientId);
    List<ChatRoom> findByChatId(String chatId);
    List<ChatRoom> findBySenderId(long id, Sort sort);
    List<ChatRoom> findByRecipientNameContainingAndSenderId(String keyword, long id, Sort sort);
}
