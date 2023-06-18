package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, String> {
    UserModel findByEmail(String email);
}