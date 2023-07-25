package com.examly.springapp.repo;

import com.examly.springapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    // UserRepository interface defines three custom query methods:
    // existsUserByEmail(String email): This method checks if a user with the specified email exists in the database.
    //  existsUserByMobileNumber(String mobileNumber): This method checks if a user with the specified mobile number exists in the database.
    //  findByEmail(String username): This method retrieves a user from the database based on the specified email (username).
    boolean existsUserByEmail(String email);

    boolean existsUserByMobileNumber(String mobileNumber);

    Users findByEmail(String username);
}
