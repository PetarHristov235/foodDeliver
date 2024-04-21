package com.example.demo.repository;

import com.example.demo.db.entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<RestaurantEntity, Long> {
    @Query(value = """
        select r from RestaurantEntity r
                join fetch r.menus m
                """)
    List<RestaurantEntity> getAllFoodsByCityActiveRestaurant();
}
