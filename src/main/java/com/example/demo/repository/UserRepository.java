package com.example.demo.repository;

import com.example.demo.db.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity,Long> {

    UserEntity findByUsername(String username);
    UserEntity findByEmail(String email);
}