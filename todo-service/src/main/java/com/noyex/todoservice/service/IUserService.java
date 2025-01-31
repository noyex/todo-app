package com.noyex.todoservice.service;

import com.noyex.tododata.DTOs.CreateUserDTO;
import com.noyex.tododata.model.User;

import java.util.List;

public interface IUserService {
    User saveUser(CreateUserDTO userDto);
    void deleteUser(Long userId);
    List<User> getAllUsers();
    User updateUser(User user, Long userId);
}
