package com.examly.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    private String userType;
    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String mobileNumber;

    @Column(nullable = false)
    private String password;

    // indicate that the field should not be persisted to the database. In this case, 
    // @Transient is used for the confirmPassword field, which is used for validation purposes and should not be stored in the database.
    @Transient
    private String confirmPassword;

    // applied to the appointmentInfo field, which represents a list of AppointmentInfo objects associated with a specific user.
    // one user can have multiple appointment information associated with them (one-to-many relationship).
    // Mapping with AppointmentInfo Table

    // orphanRemoval attribute is set to true, which means that if an AppointmentInfo entity is removed from the appointmentInfo list, 
    // it will be deleted from the database as well
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_ids", referencedColumnName = "userId")
    List<AppointmentInfo> appointmentInfo = new ArrayList<>();

}