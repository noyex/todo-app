package com.noyex.todoservice.service;

import com.noyex.tododata.model.ToDo;
import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.ToDoRepository;
import com.noyex.tododata.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ToDoService implements IToDoService {

    private final ToDoRepository toDoRepository;
    private final UserRepository userRepository;

    public ToDoService(ToDoRepository toDoRepository, UserRepository userRepository) {
        this.toDoRepository = toDoRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ToDo> getListOfToDosByUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        User existingUser = user.get();
        Long existingUserId = existingUser.getId();
        List<ToDo> toDosForUserId = toDoRepository.findByUserId(existingUserId);
        return toDosForUserId;
    }

    @Override
    public ToDo saveForUser(ToDo toDo, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        User existingUser = user.get();
        toDo.setUser(existingUser);
        return toDoRepository.save(toDo);
    }

    @Override
    public ToDo update(ToDo toDo) {
        return null;
    }

    @Override
    public void delete(Long toDoId) {

    }
}
