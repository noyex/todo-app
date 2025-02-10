package com.noyex.todoservice.service;


import com.noyex.tododata.DTOs.LoginUserDTO;
import com.noyex.tododata.DTOs.RegisterUserDTO;
import com.noyex.tododata.DTOs.VerifyUserDTO;
import com.noyex.tododata.DTOs.updateUser.UpdateEmailDTO;
import com.noyex.tododata.DTOs.updateUser.UpdatePassDTO;
import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthenticationService implements IAuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            EmailService emailService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public User signup(RegisterUserDTO input) {
        User user = new User(input.getUsername(), input.getEmail(), passwordEncoder.encode(input.getPassword()));
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationExpiration(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);
        sendVerificationEmail(user);
        return userRepository.save(user);
    }

    @Override
    public User authenticate(LoginUserDTO input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified. Please verify your account.");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return user;
    }

    @Override
    public void verifyUser(VerifyUserDTO input) {
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getVerificationExpiration().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification code has expired");
            }
            if (user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationExpiration(null);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Invalid verification code");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public void resendVerificationCode(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()) {
                throw new RuntimeException("Account is already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationExpiration(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public User updateEmail(UpdateEmailDTO input, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!user.checkPassword(input.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        if (userRepository.existsByEmail(input.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        try {
            user.setEmail(input.getEmail());
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationExpiration(LocalDateTime.now().plusMinutes(15));
            user.setEnabled(false);

            sendVerificationEmail(user);

            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update email. Please try again later.", e);
        }
    }

    @Override
    public User updatePassword(UpdatePassDTO input, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!user.checkPassword(input.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }
        boolean isEmailValid = input.getEmail().equals(user.getEmail());

        if(!isEmailValid){
            throw new IllegalArgumentException("Invalid email");
        }

        try{
            user.setPassword(input.getNewPassword());
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationExpiration(LocalDateTime.now().plusMinutes(15));
            user.setEnabled(false);

            sendVerificationEmail(user);

            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update password. Please try again later.", e);
        }
    }

    private void sendVerificationEmail(User user) {
        String subject = "Account Verification";
        String verificationCode = "VERIFICATION CODE " + user.getVerificationCode();
        String htmlMessage = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta charset=\"UTF-8\">" +
                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "</head>" +
                "<body style=\"margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\">" +
                "<div style=\"background-color: #F2F2F7; padding: 40px 20px;\">" +
                "<table cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 400px; width: 100%; margin: 0 auto; background-color: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);\">" +
                "<tr>" +
                "<td style=\"padding: 40px 32px 32px 32px; text-align: center;\">" +
                "<h1 style=\"color: #1c1c1e; font-size: 24px; margin: 0 0 16px 0; font-weight: 600;\">Verify Your Email</h1>" +
                "<p style=\"color: #8e8e93; font-size: 15px; line-height: 1.4; margin: 0 0 32px 0;\">Enter this verification code to continue</p>" +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td style=\"padding: 0 32px 40px 32px;\">" +
                "<div style=\"background-color: #F2F2F7; border-radius: 16px; padding: 24px; text-align: center;\">" +
                "<div style=\"font-family: -apple-system, BlinkMacSystemFont, monospace; letter-spacing: 8px; font-size: 32px; font-weight: 600; color: #007AFF;\">" +
                verificationCode +
                "</div>" +
                "<p style=\"color: #8e8e93; font-size: 13px; margin: 16px 0 0 0;\">Code expires in 10 minutes</p>" +
                "</div>" +
                "</td>" +
                "</tr>" +
                "</table>" +
                "</div>" +
                "</body>" +
                "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}