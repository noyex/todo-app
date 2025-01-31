package com.noyex.todoservice.service;

import com.noyex.tododata.model.User;

import java.util.List;

public interface IUserService {
    User saveUser(User user);
    void deleteUser(Long userId);
    List<User> getAllUsers();
}
