package com.noyex.todoservice.service;


import com.noyex.tododata.DTOs.CreateToDoDTO;
import com.noyex.tododata.model.ToDo;

import java.util.List;

public interface IToDoService {
    List<ToDo> getListOfToDosByUserId(Long userId);
    ToDo saveForUser(CreateToDoDTO toDoDto, Long userId);
    ToDo update(ToDo toDo, Long userId, Long toDoId);
    void delete(Long toDoId);
}
