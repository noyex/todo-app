package com.noyex.todoservice.service;

import com.noyex.tododata.DTOs.LoginUserDTO;
import com.noyex.tododata.DTOs.RegisterUserDTO;
import com.noyex.tododata.DTOs.VerifyUserDTO;
import com.noyex.tododata.DTOs.updateUser.UpdateEmailDTO;
import com.noyex.tododata.DTOs.updateUser.UpdatePassDTO;
import com.noyex.tododata.model.User;

public interface IAuthenticationService {
    User signup(RegisterUserDTO input);
    User authenticate(LoginUserDTO input);
    void verifyUser(VerifyUserDTO input);
    void resendVerificationCode(String email);
    User updateEmail(UpdateEmailDTO input, Long userId);
    User updatePassword(UpdatePassDTO input, Long userId);
}
