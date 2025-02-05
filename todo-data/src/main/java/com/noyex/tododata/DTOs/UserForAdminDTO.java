package com.noyex.tododata.DTOs;

import com.noyex.tododata.model.Role;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

public class UserForAdminDTO {
    private boolean enabled;
    private LocalDateTime createdAt;
    private Long id;
    private LocalDateTime lastLoginDate;
    private LocalDateTime verificationExpiration;
    private String username;
    private String mail;
    private String verificationCode;
    private Role role;
}
