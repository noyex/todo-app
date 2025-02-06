package com.noyex.tododata.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.noyex.tododata.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    @Size(min = 3, max = 20)
    private String username;
    @Email
    private String mail;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private Role role;
}
