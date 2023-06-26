package com.examly.springapp.service;

import com.examly.springapp.model.Review;

import java.util.*;

public interface ReviewService {

    public Review addReview(Review review);

    public Review deleteReview(long id);

    public Review editReview(Review review, long id);

    public List<Review> fetchReviewsByCenterId(long centerId);
}
