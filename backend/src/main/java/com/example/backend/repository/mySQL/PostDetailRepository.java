package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.PostDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostDetailRepository extends JpaRepository<PostDetail, Long> {
}
