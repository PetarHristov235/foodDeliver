package com.example.demo.controller;

import com.example.demo.dto.FoodDTO;
import com.example.demo.db.entity.FoodEntity;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;

public interface FoodController {
    public ResponseEntity<List<FoodEntity>> getAllFoods();

    public List<FoodEntity> updateFoodPriceById(BigDecimal price, Long id);

    public FoodEntity saveFood(FoodDTO dto);

    public List<FoodEntity> deleteFood(Long id);
}
