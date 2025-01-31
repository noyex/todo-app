package com.noyex.todoservice.service;

import com.noyex.tododata.DTOs.user.UserDTO;
import com.noyex.tododata.model.User;

import java.util.List;

public interface IUserService {
    User saveUser(UserDTO userDto);
    void deleteUser(Long userId);
    List<User> getAllUsers();
    User updateUser(UserDTO userDTO, Long userId);
}
