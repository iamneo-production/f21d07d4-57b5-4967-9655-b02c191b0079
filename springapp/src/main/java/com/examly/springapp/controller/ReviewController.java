package com.examly.springapp.controller;

import com.examly.springapp.model.Review;
import com.examly.springapp.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    // add a review
    @PostMapping("/addReview")
    public Review addReview(@RequestBody Review review) {
        return this.reviewService.addReview(review);
    }

    // delete a review
    @DeleteMapping("/deleteReview/{id}")
    public Review deleteReview(@PathVariable long id) {
        return this.reviewService.deleteReview(id);
    }

    // edit a review
    @PutMapping("/editReview/{id}")
    public Review editReview(@RequestBody Review review, @PathVariable long id) {
        return this.reviewService.editReview(review, id);
    }

    @GetMapping("/getReviews/{centerId}")
    public List<Review> getAllReviewsByCenter(@PathVariable long centerId) {
        return this.reviewService.fetchReviewsByCenterId(centerId);
    }
}
