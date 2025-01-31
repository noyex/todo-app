package com.noyex.todoapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(scanBasePackages = "com.noyex")
@ComponentScan(basePackages = {
        "com.noyex.tododata",
        "com.noyex.todoservice",
        "com.noyex.todoapi"
})
public class TodoApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodoApiApplication.class, args);
    }

}
