package com.examly.springapp.repo;

import com.examly.springapp.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import javax.transaction.Transactional;
import java.util.*;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    //The ReviewRepository interface defines two custom query methods:
    //findByCenterServiceCenterId(long centerId): This method is used to retrieve a list of reviews associated with a specific service center (centerId).
    // deleteByCenterServiceCenterId(long centerId): This method is used to delete all reviews associated with a specific service center (centerId).
    public List<Review> findByCenterServiceCenterId(long centerId);

    // This annotation indicates that the method should be executed within a transactional context, and the database operations performed by the method will be 
    //treated as a single unit of work. If the method executes successfully, the changes will be committed 
    // to the database as a single transaction. If an exception occurs, the transaction will be rolled back, 
    // and any changes made within the transaction will be undone.
    @Transactional
    void deleteByCenterServiceCenterId(long centerId);
}
