package com.examly.springapp.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

// class responsible for handling JSON Web Tokens (JWTs) used in the authentication process. 
 //It contains various methods to generate, retrieve, and validate JWT tokens.

@Component
public class JwtUtil {

//    private static final long serialVersionUID = 234234523523L;

    public static final long JWT_TOKEN_VALIDITY = 1 * 10 * 60;

    // This field is used to store the secret key used for signing the JWT.
    // The secret key is a secure random string that should be kept secret as it is used to verify the authenticity of the token.
    @Value("${jwt.secret}")
    private String secretKey;

    //This method takes a JWT token as input and retrieves the username (subject) from the token's claims.
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    //This method takes a JWT token as input and retrieves the expiration date from the token's claims.
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    //This method takes a JWT token and a function (claimsResolver) as input and retrieves a specific claim from the token's
    // claims using the provided resolver function.
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }


    //for retrieving any information from token we will need the secret key
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }


    //This method takes a JWT token as input and checks if the token has expired by comparing the current date with the token's expiration date.
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }


    //This method takes a UserDetails object (representing the authenticated user) as input and generates a JWT token for the user. 
    // It includes the user's details as claims in the token.
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }


    //while creating the token -
    //1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
    //2. Sign the JWT using the HS512 algorithm and secret key.
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secretKey).compact();
    }

    //his method takes a JWT token and a UserDetails object as input and validates the token. It checks if the token's username matches the user's 
    // username in the UserDetails and if the token has not expired.
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
