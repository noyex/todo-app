package com.noyex.tododata.DTOs;

import com.noyex.tododata.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserToUpdateDTO {

    private String username;
    private String email;
    private Role role;
}
