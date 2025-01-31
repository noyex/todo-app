package com.noyex.todoservice.service;

import com.noyex.tododata.model.User;

public interface IUserService {
    User saveUser(User user);
    void deleteUser(User user);
}
