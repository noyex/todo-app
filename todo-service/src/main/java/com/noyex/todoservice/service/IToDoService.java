package com.noyex.todoservice.service;


import com.noyex.tododata.model.ToDo;

public interface IToDoService {
    ToDo getByUserId(Long userId);
    ToDo save(ToDo toDo);
    ToDo update(ToDo toDo);
    void delete(Long toDoId);
}
