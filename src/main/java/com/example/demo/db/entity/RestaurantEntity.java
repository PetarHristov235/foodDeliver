package com.example.demo.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Persistable;

import java.time.LocalTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "restaurant")
public class RestaurantEntity implements Persistable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "restaurantIdSeqGenerator")
    @SequenceGenerator(name = "restaurantIdSeqGenerator", sequenceName = "restaurant_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "restaurant_name", unique = true)
    private String name;

    @OneToMany
    @JoinColumn(name = "restaurant_id")
    private List<MenuEntity> menus;

    @Column
    private boolean isActive;

    @Column(name = "open_from")
    LocalTime openFrom;

    @Column(name = "closes_at")
    LocalTime closesAt;

    @Column(name = "city")
    String city;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
