package com.example.backend.repository.mySQL;

import com.example.backend.Enum.PostStatus;
import com.example.backend.dto.filter.AdminPostFilter;
import com.example.backend.dto.filter.AdminUserFilter;
import com.example.backend.dto.filter.PostFilter;
import com.example.backend.entity.mySQL.*;
import com.example.backend.utils.Util;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class FilterRepository {
    @Autowired
    private Util util;
    private final EntityManager entityManager;

    public FilterRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    private List<Predicate> buildPostListPredicates(
            CriteriaBuilder cb,
            Root<Post> post,
            Join<Post, PostDetail> postDetail,
            Join<Post, Address> address,
            Join<Address, Ward> ward,
            Join<Ward, District> district,
            Join<District, City> city,
            PostFilter filter
    ) {
        List<Predicate> predicates = new ArrayList<>();
        if (!filter.getAddressDetail().isBlank())
            predicates.add(cb.equal(cb.lower(address.get("detail")), filter.getAddressDetail().toLowerCase()));
        if (!filter.getAddressWard().isBlank())
            predicates.add(cb.equal(cb.lower(ward.get("name")), filter.getAddressWard().toLowerCase()));
        if (!filter.getAddressDistrict().isBlank())
            predicates.add(cb.equal(cb.lower(district.get("name")), filter.getAddressDistrict().toLowerCase()));
        if (!filter.getAddressCity().isBlank())
            predicates.add(cb.equal(cb.lower(city.get("name")), filter.getAddressCity().toLowerCase()));
        if (filter.getMinPrice() > 0)
            predicates.add(cb.greaterThanOrEqualTo(postDetail.get("price"), filter.getMinPrice()));
        if (filter.getMaxPrice() > 0)
            predicates.add(cb.lessThanOrEqualTo(postDetail.get("price"), filter.getMaxPrice()));
        if (filter.getMinArea() > 0)
            predicates.add(cb.greaterThanOrEqualTo(postDetail.get("area"), filter.getMinArea()));
        if (filter.getMaxArea() > 0)
            predicates.add(cb.lessThanOrEqualTo(postDetail.get("area"), filter.getMaxArea()));
        if (!filter.getFurniture().isBlank())
            predicates.add(cb.equal(postDetail.get("furniture"), filter.getFurniture()));
        predicates.add(cb.equal(post.get("status"), PostStatus.ENABLED));
        return predicates;
    }

    public List<Post> filterPost(PostFilter filter) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Post> cq = cb.createQuery(Post.class);

        Root<Post> post = cq.from(Post.class);
        Join<Post, Address> address = post.join("address");
        Join<Post, PostDetail> postDetail = post.join("postDetail");
        Join<Address, Ward> ward = address.join("ward");
        Join<Ward, District> district = ward.join("district");
        Join<District, City> city = district.join("city");

        List<Predicate> predicates = buildPostListPredicates(cb, post, postDetail, address, ward, district, city, filter);

        String[] sort = filter.getSortCondition().split(" ");

        if("price".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(postDetail.get("price")) : cb.desc(postDetail.get("price")) );
        else if ("area".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(postDetail.get("area")) : cb.desc(postDetail.get("area")) );
        else if ("createdAt".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(post.get("createdAt")) : cb.desc(post.get("createdAt")) );

        cq.where(predicates.toArray(new Predicate[0]));

        TypedQuery<Post> query = entityManager.createQuery(cq);
        query.setFirstResult((filter.getPageNumber() - 1) * 4);
        query.setMaxResults(4);
        return query.getResultList();
    }

    public Long countPost(PostFilter filter) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);

        Root<Post> countPost = cq.from(Post.class);
        Join<Post, Address> address = countPost.join("address");
        Join<Post, PostDetail> postDetail = countPost.join("postDetail");
        Join<Address, Ward> ward = address.join("ward");
        Join<Ward, District> district = ward.join("district");
        Join<District, City> city = district.join("city");

        List<Predicate> predicates = buildPostListPredicates(cb, countPost, postDetail, address, ward, district, city, filter);

        cq.select(cb.count(countPost)).where(predicates.toArray(new Predicate[0]));
        TypedQuery<Long> query = entityManager.createQuery(cq);
        return query.getSingleResult();
    }

    List<Predicate> buildAdminPostListPredicate(
            AdminPostFilter filter,
            CriteriaBuilder cb,
            Root<Post> post,
            Join<Post, User> user
    ){
        List<Predicate> predicates = new ArrayList<>();
        if(!filter.getAuthorName().isBlank()) predicates.add(cb.like(cb.lower(user.get("fullName")), "%" + filter.getAuthorName().toLowerCase() + "%"));
        if(!filter.getStatus().isBlank()) predicates.add(cb.equal((post.get("status")), PostStatus.valueOf(filter.getStatus())));
        return predicates;
    }

    public List<Post> adminFilterPost(AdminPostFilter filter) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Post> cq = cb.createQuery(Post.class);

        Root<Post> post = cq.from(Post.class);
        Join<Post, User> user = post.join("user");
        Subquery<Long> reportCountSubquery = cq.subquery(Long.class);
        Root<PostReport> reportRoot = reportCountSubquery.from(PostReport.class);
        reportCountSubquery.select(cb.count(reportRoot))
                .where(cb.equal(reportRoot.get("post"), post));

        List<Predicate> predicates = buildAdminPostListPredicate(filter, cb, post, user);

        if(!filter.getSortCondition().isBlank()){
            String[] sort = filter.getSortCondition().split(" ");
            if("id".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(post.get("id")) : cb.desc(post.get("id")) );
            if("reportCount".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(reportCountSubquery.getSelection()) : cb.desc(reportCountSubquery.getSelection()));
            if("createdAt".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(post.get("createdAt")) : cb.desc(post.get("createdAt")));
            if("updatedAt".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(post.get("updatedAt")) : cb.desc(post.get("updatedAt")));
        }

        cq.where(predicates.toArray(new Predicate[0]));
        TypedQuery<Post> query = entityManager.createQuery(cq);
        query.setFirstResult((filter.getPageNumber() - 1) * filter.getPageSize());
        query.setMaxResults(filter.getPageSize());
        return query.getResultList();
    }

    public long countAdminPost(AdminPostFilter filter) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);

        Root<Post> post = cq.from(Post.class);
        Join<Post, User> user = post.join("user");

        List<Predicate> predicates = buildAdminPostListPredicate(filter, cb, post, user);
        cq.select(cb.count(post)).where(predicates.toArray(new Predicate[0]));
        TypedQuery<Long> query = entityManager.createQuery(cq);
        return query.getSingleResult();
    }

    List<Predicate> buildAdminUserListPredicate(
            AdminUserFilter filter,
            CriteriaBuilder cb,
            Root<User> user
    ){
        List<Predicate> predicates = new ArrayList<>();
        if(!filter.getFullName().isBlank()) predicates.add(cb.like(cb.lower(user.get("fullName")), "%" + filter.getFullName().toLowerCase() + "%"));
        if(!filter.getPhoneNumber().isBlank()) predicates.add(cb.like(user.get("phoneNumber"), "%" + filter.getPhoneNumber() + "%"));
        if(!filter.getEmail().isBlank()) predicates.add(cb.like(user.get("email"), "%" + filter.getEmail() + "%"));
        return predicates;
    }

    public List<User> adminFilterUser(AdminUserFilter filter) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> cq = cb.createQuery(User.class);

        Root<User> user = cq.from(User.class);
        Subquery<Long> reportCountSubquery = cq.subquery(Long.class);
        Root<UserReport> reportRoot = reportCountSubquery.from(UserReport.class);
        reportCountSubquery.select(cb.count(reportRoot))
                .where(cb.equal(reportRoot.get("user"), user));

        List<Predicate> predicates = buildAdminUserListPredicate(filter, cb, user);

        String[] sort = filter.getSortCondition().split(" ");

        if("id".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(user.get("id")) : cb.desc(user.get("id")) );
        if("reportCount".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(reportCountSubquery.getSelection()) : cb.desc(reportCountSubquery.getSelection()));
        if("createdAt".equals(sort[0])) cq.orderBy("asc".equals(sort[1]) ? cb.asc(user.get("createdAt")) : cb.desc(user.get("createdAt")));


        cq.where(predicates.toArray(new Predicate[0]));
        TypedQuery<User> query = entityManager.createQuery(cq);
        query.setFirstResult((filter.getPageNumber() - 1) * filter.getPageSize());
        query.setMaxResults(filter.getPageSize());
        return query.getResultList();
    }

    public long countAdminUser(AdminUserFilter filter){
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);

        Root<User> user = cq.from(User.class);

        List<Predicate> predicates = buildAdminUserListPredicate(filter, cb, user);
        cq.select(cb.count(user)).where(predicates.toArray(new Predicate[0]));
        TypedQuery<Long> query = entityManager.createQuery(cq);
        return query.getSingleResult();
    }

    public List<Ward> searchAddress(String keyword, String cityName) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Ward> cq = cb.createQuery(Ward.class);

        Root<Ward> wardRoot = cq.from(Ward.class);
        Join<Ward, District> district = wardRoot.join("district", JoinType.LEFT);
        Join<District, City> city = district.join("city", JoinType.LEFT);

        Predicate cityPredicate = cb.equal(city.get("name"), cityName);

        List<Predicate> keywordPredicates = new ArrayList<>();
        String[] words = keyword.toLowerCase().split("[,.\\s]+");
        for(String word : words) {
            keywordPredicates.add(cb.like(cb.lower(district.get("name")), "%" + word + "%"));
            keywordPredicates.add(cb.like(cb.lower(wardRoot.get("name")), "%" + word + "%"));
        }

        cq.where(cb.and(cityPredicate, cb.or(keywordPredicates.toArray(new Predicate[0]))));
        TypedQuery<Ward> query = entityManager.createQuery(cq);
        return query.getResultList();
    }
}
