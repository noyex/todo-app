package com.noyex.todoapi.controllers;

import com.noyex.tododata.DTOs.UserDTO;
import com.noyex.tododata.DTOs.updateUser.UpdateEmailDTO;
import com.noyex.tododata.DTOs.updateUser.UpdateNameDTO;
import com.noyex.tododata.DTOs.updateUser.UpdatePassDTO;
import com.noyex.tododata.DTOs.updateUser.UpdateRoleDTO;
import com.noyex.tododata.model.Role;
import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.UserRepository;
import com.noyex.todoservice.service.IAuthenticationService;
import com.noyex.todoservice.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
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
    private final IAuthenticationService authenticationService;

    public UserController(IUserService userService, IAuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
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

    @PutMapping("/update/{userId}/name")
    public ResponseEntity<?> updateUserName(@RequestBody UpdateNameDTO updateNameDTO,
                                            @PathVariable Long userId) {
        User updatedUser = userService.updateUserName(updateNameDTO, userId);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/update/{userId}/email")
    public ResponseEntity<?> updateUserEmail(@RequestBody UpdateEmailDTO updateEmailDTO,
                                             @PathVariable Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        if (!currentUser.getId().equals(userId) && !authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You can only update your own email address");
        }

        User updatedUser = authenticationService.updateEmail(updateEmailDTO, userId);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/update/{userId}/password")
    public ResponseEntity<?> updateUserPassword(@RequestBody UpdatePassDTO updatePassDTO,
                                                @PathVariable Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        if (!currentUser.getId().equals(userId) && !authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You can only update your own password");
        }

        User updatedUser = authenticationService.updatePassword(updatePassDTO, userId);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/update/{userId}/role")
    public ResponseEntity<?> updateUserRole(@RequestBody UpdateRoleDTO input, @PathVariable Long userId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only admin can change roles!");
        }
        User updatedUser = userService.updateUserRole(input, userId);
        return ResponseEntity.ok(updatedUser);
    }


//    @PutMapping("/update/{userId}")
//    public ResponseEntity<?> updateUser(@RequestBody UserDTO user, @PathVariable Long userId){
//        return ResponseEntity.ok(userService.updateUser(user, userId));
//    }

}
