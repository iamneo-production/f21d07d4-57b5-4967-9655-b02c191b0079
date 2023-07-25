package com.examly.springapp.config;


//Spring Boot configuration class for handling unauthorized requests when using JWT (JSON Web Tokens) for authentication. 
//It implements the AuthenticationEntryPoint interface to customize the behavior when an unauthenticated user tries to access a protected resource.
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override

    //The commence() method is called when an unauthenticated user tries to access a protected resource.
    //In this method, the code sends an error response with the HTTP status code 401 Unauthorized using response.sendError().
    //The error message "Unauthorized" is sent as part of the error response.
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}
