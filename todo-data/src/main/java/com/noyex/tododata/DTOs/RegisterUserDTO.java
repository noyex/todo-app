package com.noyex.tododata.DTOs;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

@Data
public class RegisterUserDTO {

    private String username;
    private String email;
    private String password;

}
