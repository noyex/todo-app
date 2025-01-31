package com.noyex.tododata.config;

import com.noyex.tododata.repository.UserRepository;
import jakarta.persistence.Entity;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackages = "com.noyex.tododata.model")
@EnableJpaRepositories(basePackages = "com.noyex.tododata.repository")
public class DataConfig {
}
