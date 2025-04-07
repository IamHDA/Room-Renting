package com.example.backend.entity.mySQL;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "ward")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "ward", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Address> addresses;

    @ManyToOne
    @JoinColumn(name = "district_id", nullable = false)
    private District district;
}
