package com.noyex.todoservice;

import com.noyex.tododata.DTOs.RegisterUserDTO;
import com.noyex.tododata.model.User;
import com.noyex.todoservice.service.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoServiceApplication implements CommandLineRunner {

    private final AuthenticationService authenticationService;

    public TodoServiceApplication(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    public static void main(String[] args) {
        SpringApplication.run(TodoServiceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//        RegisterUserDTO input = new RegisterUserDTO("noyex", "noyeeex@gmail.com", "noyexadmin");
//        User admin = authenticationService.createAdmin(input);
    }
}
