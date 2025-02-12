package com.noyex.todoservice.service;

import com.noyex.tododata.DTOs.UserDTO;
import com.noyex.tododata.DTOs.UserToUpdateDTO;
import com.noyex.tododata.DTOs.updateUser.UpdateEmailDTO;
import com.noyex.tododata.DTOs.updateUser.UpdateNameDTO;
import com.noyex.tododata.DTOs.updateUser.UpdatePassDTO;
import com.noyex.tododata.DTOs.updateUser.UpdateRoleDTO;
import com.noyex.tododata.model.Role;
import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
        user.setEmail(userDto.getMail());
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
        existingUser.setEmail(userDTO.getMail());
        existingUser.setPassword(userDTO.getPassword());
        existingUser.setRole(userDTO.getRole());
        return userRepository.save(existingUser);
    }

    private Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(username)
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Override
    public User updateUserDetails(UserToUpdateDTO userToUpdateDTO, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        User existingUser = user.get();
        existingUser.setUsername(userToUpdateDTO.getUsername());
        existingUser.setEmail(userToUpdateDTO.getEmail());
        existingUser.setRole(userToUpdateDTO.getRole());
        return userRepository.save(existingUser);
    }

    @Override
    public User updateUserName(UpdateNameDTO updateNameDTO, Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        User user = userOptional.get();
        try{
            boolean checkPassword = user.checkPassword(updateNameDTO.getPassword());
            if(checkPassword){
                boolean existsByName = userRepository.existsByUsername(updateNameDTO.getUsername());
                if(existsByName){
                    throw new IllegalArgumentException("Username already in use");
                }
                user.setUsername(updateNameDTO.getUsername());
                return userRepository.save(user);
            }
        } catch (Exception e){
            throw new IllegalArgumentException("Invalid password");
        }
        return user;
    }

    @Override
    public User updateUserRole(UpdateRoleDTO input, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setRole(input.getRole());
        return userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        return user.get();
    }


    private void validateUser(UserDTO user) {
        boolean existsByName = userRepository.existsByUsername(user.getUsername());
        boolean existsByMail = userRepository.existsByEmail(user.getMail());
        if(existsByName || existsByMail) {
            throw new IllegalArgumentException("E-mail or username already in use");
        }
    }

    private void validateUserUpdate(UserDTO userDTO, User existingUser) {
        if(!existingUser.getUsername().equals(userDTO.getUsername())){
            if (userRepository.existsByUsername(userDTO.getUsername())) {
                throw new IllegalArgumentException("Username already taken");
            }
            if (!existingUser.getEmail().equals(userDTO.getMail())) {
                if (userRepository.existsByEmail(userDTO.getMail())) {
                    throw new IllegalArgumentException("Email already in use");
                }
            }
        }
    }
}
