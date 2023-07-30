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


    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Login authenticationRequest) throws Exception {

        try {
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
