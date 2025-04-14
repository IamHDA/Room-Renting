package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Post;
import com.example.backend.entity.mySQL.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("""
select p from Post p
where p.status != "DISABLED"
order by p.createdAt desc
limit 8
""")
    List<Post> findNewPosts();
    int countByUser(User user);
}
