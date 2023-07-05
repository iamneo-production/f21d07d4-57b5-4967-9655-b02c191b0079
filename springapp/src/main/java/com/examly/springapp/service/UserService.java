package com.examly.springapp.service;

import com.examly.springapp.model.Users;

import java.util.List;

public interface UserService {
    public String createUser(Users users);

    public List<Users> getUser();

    public String deleteUser(long id);

    public Users updateUser(Users users);
}
