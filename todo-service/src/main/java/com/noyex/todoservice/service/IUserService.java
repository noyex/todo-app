package com.noyex.todoservice.service;

import com.noyex.tododata.DTOs.UserDTO;
import com.noyex.tododata.DTOs.UserToUpdateDTO;
import com.noyex.tododata.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface IUserService {
    User saveUser(UserDTO userDto);
    void deleteUser(Long userId);
    List<User> getAllUsers();
    User updateUser(UserDTO userDTO, Long userId);
    UserDetails loadUserByUsername(String username);
    User getUserById(Long userId);
    User updateUserDetails(UserToUpdateDTO userToUpdateDTO, Long userId);
}
