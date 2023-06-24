package com.examly.springapp.repo;

import com.examly.springapp.model.Center;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CenterRepository extends JpaRepository<Center, Long> {
}
