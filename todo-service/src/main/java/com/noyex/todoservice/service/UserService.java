package com.noyex.todoservice.service;

import com.noyex.tododata.DTOs.UserDTO;
import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserService implements IUserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public User saveUser(UserDTO userDto) {
        validateUser(userDto);
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setMail(userDto.getMail());
        user.setPassword(userDto.getPassword());
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        User existingUser = user.get();
        userRepository.delete(existingUser);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(UserDTO userDTO, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        User existingUser = user.get();
        validateUserUpdate(userDTO, existingUser);
        existingUser.setUsername(userDTO.getUsername());
        existingUser.setMail(userDTO.getMail());
        existingUser.setPassword(userDTO.getPassword());
        return userRepository.save(existingUser);
    }

    private void validateUser(UserDTO user) {
        boolean existsByName = userRepository.existsByUsername(user.getUsername());
        boolean existsByMail = userRepository.existsByMail(user.getMail());
        if(existsByName || existsByMail) {
            throw new IllegalArgumentException("E-mail or username already in use");
        }
    }

    private void validateUserUpdate(UserDTO userDTO, User existingUser) {
        if(!existingUser.getUsername().equals(userDTO.getUsername())){
            if (userRepository.existsByUsername(userDTO.getUsername())) {
                throw new IllegalArgumentException("Username already taken");
            }
            if (!existingUser.getMail().equals(userDTO.getMail())) {
                if (userRepository.existsByMail(userDTO.getMail())) {
                    throw new IllegalArgumentException("Email already in use");
                }
            }
        }
    }
}
