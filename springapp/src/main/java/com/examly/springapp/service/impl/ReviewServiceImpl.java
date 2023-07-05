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
    public Review addReview(Review review) {
        this.reviewRepository.save(review);
        return review;
    }

    @Override
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
    public Review editReview(Review review, long id) {

        Optional<Review> tmp = reviewRepository.findById(id);

        Review myReview = tmp.orElseThrow(() -> new RuntimeException("No such data found"));

        myReview.setReviewContent(review.getReviewContent());

        reviewRepository.save(myReview);

        return myReview;
    }

    @Override
    public List<Review> fetchReviewsByCenterId(long centerId) {
        return this.reviewRepository.findByCenterServiceCenterId(centerId);
    }

}
