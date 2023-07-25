package com.examly.springapp.config;

//responsible for authenticating requests using JWT (JSON Web Tokens). 
import com.examly.springapp.service.impl.jwtUserDetailsService.JwtUserDetailsService;
import com.examly.springapp.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
//    This class is a Spring @Component, which means it is automatically registered as a bean in the application context.
//It extends the OncePerRequestFilter class, which ensures that the filter is executed only once per request.
    @Autowired

    //The class uses Spring's dependency injection (@Autowired) to inject instances of JwtUserDetailsService and JwtUtil.
    private JwtUserDetailsService jwtUserDetailsService;
    @Autowired
    private JwtUtil jwtUtil;
    @Override

    //    This method is the core of the filter and is called for each incoming HTTP request.
    // It implements the logic for authenticating the request using JWT.
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;

        //The method extracts the JWT token from the request's "Authorization" header, which is expected to be of the form "Bearer <JWT Token>".
        //The method then validates the extracted JWT token and checks if the token is still valid.
        if(requestTokenHeader!= null && requestTokenHeader.startsWith("Bearer ")){
            jwtToken = requestTokenHeader.substring(7);
            username = this.jwtUtil.getUsernameFromToken(jwtToken);
        }
        
        //    If the JWT token is valid, the method fetches the user details from the jwtUserDetailsService using the username extracted from the token.
    //It then creates an authentication token (UsernamePasswordAuthenticationToken) with the user details and sets it in the SecurityContextHolder to mark 
    //the user as authenticated.
        if(username!= null && SecurityContextHolder.getContext().getAuthentication()==null){
            final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);
            if(jwtUtil.validateToken(jwtToken,userDetails)){
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }

        }
        filterChain.doFilter(request,response);
    }
}
