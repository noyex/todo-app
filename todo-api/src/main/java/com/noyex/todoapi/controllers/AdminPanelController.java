package com.noyex.todoapi.controllers;

import com.noyex.tododata.DTOs.RegisterUserDTO;
import com.noyex.tododata.DTOs.UserDTO;
import com.noyex.tododata.DTOs.UserToUpdateDTO;
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


@RestController
@RequestMapping("/api/admin")
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

    @PutMapping("/update/{userId}")
    public ResponseEntity<User> updateUserDetails(@RequestBody UserToUpdateDTO userToUpdateDTO, @PathVariable Long userId) {
        return ResponseEntity.ok(userService.updateUserDetails(userToUpdateDTO, userId));
    }
}
