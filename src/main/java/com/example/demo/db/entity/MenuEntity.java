package com.example.demo.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.domain.Persistable;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "menu")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MenuEntity implements Persistable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "menuIdSeqGenerator")
    @SequenceGenerator(name = "menuIdSeqGenerator", sequenceName = "menu_id_seq", allocationSize = 1)
    Long id;

    @OneToMany
    @JoinColumn(name = "menu_id")
    List<FoodEntity> food;

    @CreatedDate
    Instant createdOn;

    @Override
    public boolean isNew() {
        return id==null;
    }
}
