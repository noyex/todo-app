package com.noyex.todoservice.config;


import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {
        "com.noyex.tododata",
        "com.noyex.todoservice"
})
public class ServiceConfig {
}
