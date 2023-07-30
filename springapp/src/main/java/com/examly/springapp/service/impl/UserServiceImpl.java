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

    // delete user details
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

    // update user details
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
