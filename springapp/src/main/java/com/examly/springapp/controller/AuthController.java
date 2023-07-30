package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.LoginModel;
import com.example.springapp.model.UserModel;
import com.example.springapp.repository.UserRepository;

@RestController
@ResponseBody
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/hello")
    public String hell(){
        return "hello";
    }

    @PostMapping("/user/login")
    public boolean isUserPresent(@RequestBody LoginModel data){
        try{
            String email=data.getEmail();
            UserModel result=userRepository.findByEmail(email);
            if(result.getUserRole().equals("user") && data.getPassword().equals(result.getPassword())){
                return true;
            }
        }
        catch(Exception err){
        }
        return false;
    }

    @PostMapping("/admin/login")
    public boolean isAdminPresent(@RequestBody LoginModel data){
        try{
            String email=data.getEmail();
            UserModel result=userRepository.findByEmail(email);
            if(result.getUserRole().equals("admin") && data.getPassword().equals(result.getPassword())){
                return true;
            }
        }
        catch(Exception err){
        }
        return false;
    }

    @PostMapping("/user/signup")
    public String saveUser(UserModel user){
        userRepository.save(user);
        return "User added";
    }

    @PostMapping("/admin/signup")
    public String saveAdmin(UserModel user){
        userRepository.save(user);
        return "Admin added";
    }
}
