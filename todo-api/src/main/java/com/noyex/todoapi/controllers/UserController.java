package com.noyex.todoapi.controllers;

import com.noyex.tododata.DTOs.UserDTO;
import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.UserRepository;
import com.noyex.todoservice.service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final IUserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(IUserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserDTO user){
        var savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password){
        var userOptional = userRepository.findByUsername(username);
        if(userOptional.isPresent() && passwordEncoder.matches(password, userOptional.get().getPassword())){
            return ResponseEntity.ok("Logged in");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO user, @PathVariable Long userId){
        return ResponseEntity.ok(userService.updateUser(user, userId));
    }

}
