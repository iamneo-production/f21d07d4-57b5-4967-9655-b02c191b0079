package com.examly.springapp.repo;

import com.examly.springapp.model.Center;
import org.springframework.data.jpa.repository.JpaRepository;

//the JpaRepository interface, the CenterRepository inherits several CRUD methods such as save, delete, findAll, 
// and findById, which can be used to perform basic database operations on the Center entity without writing explicit implementations for these methods. 
public interface CenterRepository extends JpaRepository<Center, Long> {
}
