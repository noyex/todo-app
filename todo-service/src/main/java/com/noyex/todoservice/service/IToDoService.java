package com.noyex.todoservice.service;


import com.noyex.tododata.DTOs.ToDoDTO;
import com.noyex.tododata.model.ToDo;

import java.util.List;

public interface IToDoService {
    List<ToDo> getListOfToDosByUserId(Long userId);
    List<ToDo> getListOfAllToDos();
    ToDo saveForUser(ToDoDTO toDoDto, Long userId);
    ToDo update(ToDoDTO toDoDTO, Long toDoId);
    void delete(Long toDoId);
}
