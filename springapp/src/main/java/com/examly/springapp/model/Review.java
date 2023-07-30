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

    //indicates many-to-one relationships between `Review-Users and Review-Center, respectively.
    @ManyToOne
    Users user;

    @ManyToOne

    //Cascading delete means that deleting a parent entity (in this case, a Review) 
    //will automatically delete all its associated child entities (in this case, the Center) to maintain referential integrity.
    @OnDelete(action = OnDeleteAction.CASCADE)
    Center center;
}
