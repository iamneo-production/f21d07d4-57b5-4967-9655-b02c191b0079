package com.examly.springapp.repo;

import com.examly.springapp.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import javax.transaction.Transactional;
import java.util.*;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    public List<Review> findByCenterServiceCenterId(long centerId);

    @Transactional
    void deleteByCenterServiceCenterId(long centerId);
}
