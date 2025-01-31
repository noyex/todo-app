package com.noyex.todoservice.service;

import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

@Component
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        boolean existsByName = userRepository.existsByUsername(user.getUsername());
        boolean existsByMail = userRepository.existsByEmail(user.getMail());
        if(existsByName || existsByMail) {
            throw new IllegalArgumentException("E-mail or username already in use");
        }
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }
}
