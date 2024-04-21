package com.example.demo.repository;

import com.example.demo.db.entity.FoodEntity;
import com.example.demo.db.entity.RestaurantEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface FoodRepository extends CrudRepository<FoodEntity, Long> {

    @Query(value = """
            select * from public.food
            """, nativeQuery = true)
    List<FoodEntity> findAll();

    @Modifying
    @Transactional
    @Query(value = """
             update public.food
                     set price = :price
                     where id = :id
            """, nativeQuery = true)
    void updateFoodPriceById(@Param("price") BigDecimal price, @Param("id") Long id);

    @Modifying
    @Transactional
    @Query(value = """
            delete from public.food where id = :id """, nativeQuery = true)
    void deleteFoodById(@Param("id") Long id);

    FoodEntity save(FoodEntity foodEntity);
}
