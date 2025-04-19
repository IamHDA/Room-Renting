package com.example.backend.repository.mySQL;

import com.example.backend.entity.mySQL.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findByDetailAndWard_Id(String detail, int wardId);

    @Query("""
    select a from Address a
    join Ward w on a.ward = w
    join District d on w.district = d
    join City c on d.city = c
    where lower(a.detail) like lower(concat('%', :keyword, '%'))
    or lower(w.name) like lower(concat('%', :keyword, '%'))
    or lower(d.name) like lower(concat('%', :keyword, '%'))
    or lower(c.name) like lower(concat('%', :keyword, '%'))
""")
    List<Address> searchAddress(@Param("keyword") String keyword);
}
