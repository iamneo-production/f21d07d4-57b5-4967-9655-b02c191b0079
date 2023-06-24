package com.examly.springapp.controller;

import com.examly.springapp.model.Login;
import com.examly.springapp.model.Users;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    // properties
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    // create user
    @PostMapping("/signup")
    public String createUser(@RequestBody Users user) {
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        user.setUserType("USER");
        return this.userService.createUser(user);
    }

    // Return all User
    @GetMapping("/allUser")
    public List<Users> getUser() {
        return this.userService.getUser();
    }

    // login
    @PostMapping("/login")
    public Users userLogin(@RequestBody Login login) {
        List<Users> user = getUser();
        for (Users u : user) {
            if (login.getEmail().equals(u.getEmail()) && login.getPassword().equals(u.getPassword())) {
                return u;
            }
        }
        return null;
    }

    // update user
    @PutMapping("/updateUser")

    public Users updateUser(@RequestBody Users user) {
        return this.userService.updateUser(user);
    }

    // delete user
    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable String id) {
        return this.userService.deleteUser(Long.parseLong(id));
    }
}
