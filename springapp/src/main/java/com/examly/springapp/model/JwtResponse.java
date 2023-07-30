package com.examly.springapp.model;

import lombok.*;

//It generates the getter methods for all the fields. 
@Data
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
//used to return the JWT token to the client after a successful login or authentication process.
public class JwtResponse {
    private Users users;
    private String token;
}
