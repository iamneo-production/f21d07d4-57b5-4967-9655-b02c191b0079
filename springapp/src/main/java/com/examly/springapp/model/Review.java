package com.examly.springapp.model;

import lombok.*;
import javax.persistence.*;
import com.examly.springapp.model.Center;
import com.examly.springapp.model.Users;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long reviewId;
    String dateCreated;
    String reviewContent;

    @ManyToOne
    Users user;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    Center center;
}
