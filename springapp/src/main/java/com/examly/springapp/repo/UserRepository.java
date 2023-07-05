package com.examly.springapp.repo;

import com.examly.springapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    boolean existsUserByEmail(String email);

    boolean existsUserByMobileNumber(String mobileNumber);

    Users findByEmail(String username);
}
