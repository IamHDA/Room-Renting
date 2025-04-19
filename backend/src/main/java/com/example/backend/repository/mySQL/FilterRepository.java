package com.example.backend.repository.mySQL;

import com.example.backend.Enum.PostStatus;
import com.example.backend.dto.filter.PostFilter;
import com.example.backend.entity.mySQL.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class FilterRepository {

    private final EntityManager entityManager;

    public FilterRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Post> filterPost(PostFilter filter) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Post> cq = cb.createQuery(Post.class);
        List<Predicate> predicates = new ArrayList<>();

        Root<Post> post = cq.from(Post.class);
        Join<Post, Address> address = post.join("address");
        Join<Post, PostDetail> postDetail = post.join("postDetail");
        Join<Address, Ward> ward = address.join("ward");
        Join<Ward, District> district = ward.join("district");
        Join<District, City> city = district.join("city");

        if(!filter.getAddressDetail().isBlank()) predicates.add(cb.equal(cb.lower(address.get("detail")), filter.getAddressDetail().toLowerCase()));
        if(!filter.getAddressWard().isBlank()) predicates.add(cb.equal(cb.lower(ward.get("name")), filter.getAddressWard().toLowerCase()));
        if(!filter.getAddressDistrict().isBlank()) predicates.add(cb.equal(cb.lower(district.get("name")), filter.getAddressDistrict().toLowerCase()));
        if(!filter.getAddressCity().isBlank()) predicates.add(cb.equal(cb.lower(city.get("name")), filter.getAddressCity().toLowerCase()));
        if (filter.getMinPrice() > 0) predicates.add(cb.greaterThanOrEqualTo(postDetail.get("price"), filter.getMinPrice()));
        if (filter.getMaxPrice() > 0) predicates.add(cb.lessThanOrEqualTo(postDetail.get("price"), filter.getMaxPrice()));
        if (filter.getMinArea() > 0) predicates.add(cb.greaterThanOrEqualTo(postDetail.get("area"), filter.getMinArea()));
        if (filter.getMaxArea() > 0) predicates.add(cb.lessThanOrEqualTo(postDetail.get("area"), filter.getMaxArea()));
        predicates.add(cb.equal(post.get("status"), PostStatus.ENABLED));

        String[] sort = filter.getSortCondition().split(" ");

        if("price".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(postDetail.get("price")) : cb.desc(postDetail.get("price")) );
        else if ("area".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(postDetail.get("area")) : cb.desc(postDetail.get("area")) );
        else if ("createdAt".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(post.get("createdAt")) : cb.desc(post.get("createdAt")) );

        cq.where(predicates.toArray(new Predicate[0]));
        TypedQuery<Post> query = entityManager.createQuery(cq);
        return query.getResultList();
    }
}
