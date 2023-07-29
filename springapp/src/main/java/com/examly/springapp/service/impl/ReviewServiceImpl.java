package com.examly.springapp.service.impl;

import com.examly.springapp.service.ReviewService;
import com.examly.springapp.model.Review;
import com.examly.springapp.repo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    //This method is used to add a new review to the database. It saves the review in the database using the 
    // reviewRepository and returns the saved review.
    public Review addReview(Review review) {
        this.reviewRepository.save(review);
        return review;
    }

    @Override
    //This method is used to delete a review by its id. 
    // It searches for the review with the specified id in the database, deletes it using the reviewRepository, and returns the deleted review.
    public Review deleteReview(long id) {
        List<Review> allReviews = this.reviewRepository.findAll();
        Review deletedReview = null;
        for (Review review : allReviews) {
            if (review.getReviewId() == id) {
                this.reviewRepository.delete(review);
                deletedReview = review;
            }
        }
        return deletedReview;
    }

    @Override
    //This method is used to edit an existing review. 
    // It updates the review content with the new content provided and saves the updated review to the database.
    public Review editReview(Review review, long id) {

        Optional<Review> tmp = reviewRepository.findById(id);

        Review myReview = tmp.orElseThrow(() -> new RuntimeException("No such data found"));

        myReview.setReviewContent(review.getReviewContent());

        reviewRepository.save(myReview);

        return myReview;
    }

    @Override
    //This method is used to fetch all the reviews associated with a particular service center by its centerId.
    //  It searches for all reviews with the specified centerId in the database and returns a list of those reviews.
    public List<Review> fetchReviewsByCenterId(long centerId) {
        return this.reviewRepository.findByCenterServiceCenterId(centerId);
    }

}

