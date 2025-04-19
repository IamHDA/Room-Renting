package com.example.backend.repository.mySQL;

import com.example.backend.Enum.PostStatus;
import com.example.backend.entity.mySQL.Address;
import com.example.backend.entity.mySQL.Post;
import com.example.backend.entity.mySQL.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("""
select p from Post p
where p.status = :status
order by p.createdAt desc
limit 8
""")
    List<Post> findNewPosts(@Param("status") PostStatus status);
    List<Post> findByUser_IdAndStatus(long userId, PostStatus status);
    List<Post> findByAddress(Address address);
    int countByUser(User user);
    long count();
    @Query("""
    select count(u) from User u
    where month(u.createdAt) = :month
    """)
    long countByThisMonth(@Param("month") int month);
    @Query("""
    select count(u) from User u
    where day(u.createdAt) = :day
    """)
    long countByThisDay(@Param("day") int day);
}
