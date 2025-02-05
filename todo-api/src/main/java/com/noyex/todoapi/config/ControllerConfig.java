package com.noyex.todoapi.config;


import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {
        "com.noyex.tododata",
        "com.noyex.todoservice",
        "com.noyex.todoapi"
})
public class ControllerConfig {
}
