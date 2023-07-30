package com.examly.springapp.config;

import com.examly.springapp.service.impl.jwtUserDetailsService.JwtUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

//    This class is a Spring @Configuration and @EnableWebSecurity class, which means it provides security configurations for the application.
//    It extends WebSecurityConfigurerAdapter, a class that provides default security configurations.
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    //he class uses Spring's dependency injection (@Autowired) to inject instances of JwtUserDetailsService, JwtAuthenticationEntryPoint, 
    //and JwtAuthenticationFilter.
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    //password encoder
    //    The class defines a PasswordEncoder bean to configure the password encoder used for user authentication.
    // We  uses the BCryptPasswordEncoder as the password encoder, which is a strong and secure hashing algorithm.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
//        return NoOpPasswordEncoder.getInstance();
    }

    @Override
    @Bean
    //The class defines a bean for the authentication manager, which is used for user authentication.
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    //this is used for which type of authentication we are going to use
    @Override
    // The configure(AuthenticationManagerBuilder auth) method sets up the authentication manager to use the JwtUserDetailsService 
    // for user authentication and the defined PasswordEncoder for password validation.
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }
//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(jwtUserDetailsService);//.passwordEncoder(passwordEncoder());
//    }

    //this is used for permit urls
    @Override

    //The configure(HttpSecurity http) method configures the HTTP security settings for the application.
    //It sets up URL permissions using antMatchers() to permit specific URLs without authentication (e.g., login and signup URLs) 
    //and requires authentication for all other URLs.
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests().antMatchers("/authenticate","/admin/appointment","/admin/appointment/{id}","/admin/service-center","/admin/service-center/{id}","/signup").permitAll()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .anyRequest().authenticated()
                .and()

                // sets the authentication entry point to the JwtAuthenticationEntryPoint, which handles unauthorized requests.
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .logout()
                .logoutUrl("/logout").and().cors().configurationSource(corsConfigurationSource());;
        
                //The class adds the JwtAuthenticationFilter before the UsernamePasswordAuthenticationFilter in the filter chain. 
                //This filter is responsible for authenticating requests using JWT.
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    //The corsConfigurationSource() method configures CORS (Cross-Origin Resource Sharing) 
    //to allow requests from any origin (*) and specific methods (GET, POST, PUT, DELETE).
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
