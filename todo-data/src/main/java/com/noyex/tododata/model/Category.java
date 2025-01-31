package com.noyex.tododata.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Category {

    @Id
    private Long id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    private String color;
}
