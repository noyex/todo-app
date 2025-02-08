package com.noyex.todoapi.controllers;

import com.noyex.tododata.DTOs.UserDTO;
import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.UserRepository;
import com.noyex.todoservice.service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(){
        List<User> users = userService.getAllUsers();
        System.out.println("Znaleziono użytkowników: " + users.size());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId){
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

//    @PutMapping("/update/{userId}")
//    public ResponseEntity<?> updateUser(@RequestBody UserDTO user, @PathVariable Long userId){
//        return ResponseEntity.ok(userService.updateUser(user, userId));
//    }

}
