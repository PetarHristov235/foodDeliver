package com.example.demo.db.entity;

import com.example.demo.db.enums.FoodType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Persistable;

import java.math.BigDecimal;

@Entity(name = "food")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class FoodEntity implements Persistable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "restaurantIdSeqGenerator")
    @SequenceGenerator(name = "restaurantIdSeqGenerator", sequenceName = "food_id_seq", allocationSize = 1)
    Long id;

    @Column(name = "food_name")
    String foodName;

    @Column(name = "weight")
    BigDecimal weight;

    @Column(name = "food_details")
    String foodDetails;

    @Column(name = "price")
    BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(name = "food_type")
    FoodType foodType;

    @Override
    public boolean isNew() {
        return id == null;
    }
}