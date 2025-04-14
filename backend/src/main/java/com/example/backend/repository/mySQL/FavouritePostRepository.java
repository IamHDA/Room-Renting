package com.example.backend.repository.mySQL;

import com.example.backend.entity.id.FavouritePostId;
import com.example.backend.entity.mySQL.FavouritePost;
import com.example.backend.entity.mySQL.Post;
import com.example.backend.entity.mySQL.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouritePostRepository extends JpaRepository<FavouritePost, FavouritePostId> {
    List<FavouritePost> findByUser(User user);
    @Query("""
    select fp.post from FavouritePost fp
    where fp.user = :user
""")
    List<Post> findFavouritePostsByUser(User user);
    void deleteByPost_IdAndUser(long id, User user);
}
