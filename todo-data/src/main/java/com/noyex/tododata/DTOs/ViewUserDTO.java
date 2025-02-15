package com.noyex.tododata.DTOs;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ViewUserDTO {
    private Long id;
    private String username;
    private String mail;
    private String role;

    public ViewUserDTO(Long id, String username, String mail, String role) {
        this.id = id;
        this.username = username;
        this.mail = mail;
        this.role = role;
    }
}
