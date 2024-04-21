package com.example.demo.controller;

import com.example.demo.db.entity.RestaurantEntity;
import com.example.demo.repository.FoodRepository;
import com.example.demo.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/menu")
@RequiredArgsConstructor
public class MenuController {

    private final RestaurantRepository restaurantRepository;

    @GetMapping("/last-meny-by-restaurant")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<RestaurantEntity>> getLastMenuByRestaurant() {
        return new ResponseEntity<>(restaurantRepository.getAllFoodsByCityActiveRestaurant(), HttpStatus.OK);
    }
}
