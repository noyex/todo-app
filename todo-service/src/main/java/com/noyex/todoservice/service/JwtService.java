package com.noyex.todoservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    @Value ("${JWR_SECRET}")
}
