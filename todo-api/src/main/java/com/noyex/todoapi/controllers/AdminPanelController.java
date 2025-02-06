package com.noyex.todoapi.controllers;

import com.noyex.tododata.DTOs.RegisterUserDTO;
import com.noyex.tododata.model.Role;
import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.UserRepository;
import com.noyex.todoservice.service.AuthenticationService;
import com.noyex.todoservice.service.ICategoryService;
import com.noyex.todoservice.service.IToDoService;
import com.noyex.todoservice.service.IUserService;
import jakarta.persistence.PrePersist;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/admin")
@RestController
public class AdminPanelController {
    private final IUserService userService;
    private final IToDoService todoService;
    private final ICategoryService categoryService;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    public AdminPanelController(IUserService userService, IToDoService todoService, ICategoryService categoryService, AuthenticationService authenticationService, UserRepository userRepository) {
        this.userService = userService;
        this.todoService = todoService;
        this.categoryService = categoryService;
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
    }

//    @PostMapping("/users/add/admin")
//    public ResponseEntity<User> createAdmin(@RequestBody RegisterUserDTO input){
//        User user = authenticationService.createAdmin(input);
//        return ResponseEntity.ok(user);
//    }

//    @PostMapping("/users/add")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<User> createUser(@RequestBody RegisterUserDTO registerUserDTO){
//        User registeredUser = authenticationService.singUp(registerUserDTO, Role.USER);
//        registeredUser.setEnabled(true);
//        registeredUser.setVerificationCode(null);
//        registeredUser.setVerificationExpiration(null);
//        userRepository.save(registeredUser);
//        return ResponseEntity.ok(registeredUser);
//    }

    @DeleteMapping("/users/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted");
    }

    @GetMapping("/users/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    @GetMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userRepository.findById(id).get());
    }

//    @PutMapping("/users/update")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<User> updateUser(@RequestBody User user){
//
//    }
}
