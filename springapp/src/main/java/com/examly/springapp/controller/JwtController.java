package com.examly.springapp.controller;

import com.examly.springapp.model.JwtResponse;
import com.examly.springapp.model.Login;
import com.examly.springapp.model.Users;
import com.examly.springapp.repo.UserRepository;
import com.examly.springapp.service.UserService;
import com.examly.springapp.service.impl.jwtUserDetailsService.JwtUserDetailsService;
import com.examly.springapp.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class JwtController {

    //he class uses Spring's dependency injection (@Autowired) to inject instances of 
    // AuthenticationManager, UserService, JwtUserDetailsService, JwtUtil, and UserRepository.

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    //This method is responsible for authenticating a user and generating a JWT token for the authenticated user.
    @PostMapping("/authenticate")

    // @RequestBody annotation is used to map the request body to the Login model, which contains the user's email and password.
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Login authenticationRequest) throws Exception {

        try {
            // authenticate method is called to verify the user's credentials, and if the user is authenticated successfully, 
            // a JWT token is generated using the JwtUtil.
            authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());
        }catch (UsernameNotFoundException e){
            e.printStackTrace();
            throw new Exception("Username not found");
        }


        //final area
        final UserDetails userDetails = this.userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        System.out.println(userDetails.toString());

        final Users users = userRepository.findByEmail(authenticationRequest.getEmail());
        final String token = jwtUtil.generateToken(userDetails);
        System.out.println(token);

        return ResponseEntity.ok(new JwtResponse(users,token));
    }

    //This method is used internally to perform user authentication using the authenticationManager.
    //It takes the user's email and password as arguments and attempts to authenticate the user using the UsernamePasswordAuthenticationToken.
    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED"+ e.getMessage());
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS"+ e.getMessage());
        }
    }
}
