package com.examly.springapp.service.impl.jwtUserDetailsService;

import com.examly.springapp.model.Users;
import com.examly.springapp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired

    //This is a repository interface that is autowired into the JwtUserDetailsService class. 
    // It allows the service to interact with the database to retrieve user details.
    private UserRepository userRepository;
    @Override

    //This method is overridden from the UserDetailsService interface. 
    // It takes the username (email address) as input and retrieves the corresponding user details from the database using the UserRepository.
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // /This method is called to fetch user details from the database based on the provided email (username). 
        // It uses the userRepository to query the database and find the user with the specified email address.
        Users user = this.userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(user.getEmail(), user.getPassword(),new ArrayList<>());
    }
}
