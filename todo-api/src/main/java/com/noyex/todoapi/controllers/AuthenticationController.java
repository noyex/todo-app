package com.noyex.todoapi.controllers;

import com.noyex.todoapi.responses.LoginResponse;
import com.noyex.tododata.DTOs.LoginUserDTO;
import com.noyex.tododata.DTOs.RegisterUserDTO;
import com.noyex.tododata.DTOs.VerifyUserDTO;
import com.noyex.tododata.model.Role;
import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.UserRepository;
import com.noyex.todoservice.service.AuthenticationService;
import com.noyex.todoservice.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RequestMapping("/api/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/singup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDTO registerUserDTO){
        User registeredUser = authenticationService.signup(registerUserDTO);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDTO loginUserDTO){
        User authenticatedUser = authenticationService.authenticate(loginUserDTO);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        authenticatedUser.setLastLoginDate(LocalDateTime.now());
        userRepository.save(authenticatedUser);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDTO verifyUserDTO){
        try{
            authenticationService.verifyUser(verifyUserDTO);
            return ResponseEntity.ok("Account verified succefully");
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email){
        try{
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
