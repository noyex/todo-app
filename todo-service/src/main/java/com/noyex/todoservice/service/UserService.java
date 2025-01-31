package com.noyex.todoservice.service;

import com.noyex.tododata.DTOs.CreateUserDTO;
import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Component
public class UserService implements IUserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public User saveUser(CreateUserDTO userDto) {
        boolean existsByName = userRepository.existsByUsername(userDto.getUsername());
        boolean existsByMail = userRepository.existsByMail(userDto.getMail());
        if(existsByName || existsByMail) {
            throw new IllegalArgumentException("E-mail or username already in use");
        }
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
    public User updateUser(User user, Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        User existingUser = optionalUser.get();
        existingUser.setUsername(user.getUsername());
        existingUser.setMail(user.getMail());
        existingUser.setPassword(user.getPassword());
        return userRepository.save(existingUser);
    }
}
