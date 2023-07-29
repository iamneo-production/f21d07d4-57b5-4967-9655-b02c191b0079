package com.examly.springapp.service.impl;

import com.examly.springapp.model.Users;
import com.examly.springapp.repo.UserRepository;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override

    //This method is used to create a new user. It checks if the provided email and mobile number already exist in the database. 
    // If either of them already exists, it returns an error message. Otherwise, it saves the user details in the database and returns a success message.
    public String createUser(Users users) {
        boolean emailAlreadyExists = userRepository.existsUserByEmail(users.getEmail());
        boolean mobileAlreadyExists = userRepository.existsUserByMobileNumber(users.getMobileNumber());

        if (emailAlreadyExists) {
            return "Email id already exists";
        }
        if (mobileAlreadyExists) {
            return "Mobile number already exists";
        }
        try {
            userRepository.save(users);
            return "User created succesfully";
        } catch (Exception e) {
            return "User creation failed. Try Again";
        }
    }

    // return all user details
    @Override
    public List<Users> getUser() {
        return this.userRepository.findAll();
    }

    // This method is used to delete a user from the database. It takes the user ID as input and searches for the user in the list of users.
    // If the user is found, it is deleted from the database, and a success message is returned. If the user is not found, a failure message is returned.
    @Override
    public String deleteUser(long id) {
        List<Users> usersList = getUser();
        for (Users x : usersList) {
            if (Objects.equals(x.getUserId(), id)) {
                this.userRepository.delete(x);
                return "deleted";
            }
        }
        return "failed";
    }

    // This method is used to update user details in the database. It takes a Users object as input and searches for the user with the same ID in the list of users. 
    // If the user is found, the user details are updated in the database, and the updated Users object is returned.
    @Override
    public Users updateUser(Users users) {
        List<Users> usersList = getUser();
        for (Users x : usersList) {
            if (Objects.equals(x.getUserId(), users.getUserId())) {
                this.userRepository.save(users);
            }
        }
        return users;
    }
}

