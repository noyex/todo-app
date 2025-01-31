package com.noyex.todoservice.service;

import com.noyex.tododata.DTOs.CreateToDoDTO;
import com.noyex.tododata.model.Category;
import com.noyex.tododata.model.ToDo;
import com.noyex.tododata.model.User;
import com.noyex.tododata.repository.CategoryRepository;
import com.noyex.tododata.repository.ToDoRepository;
import com.noyex.tododata.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class ToDoService implements IToDoService {

    private final ToDoRepository toDoRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ToDoService(ToDoRepository toDoRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.toDoRepository = toDoRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
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
    public ToDo saveForUser(CreateToDoDTO toDo, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        User existingUser = user.get();
        ToDo newToDo = new ToDo();
        newToDo.setUser(existingUser);
        newToDo.setTitle(toDo.getTitle());
        newToDo.setDescription(toDo.getDescription());
        newToDo.setDueTo(toDo.getDueTo());
        newToDo.setDone(toDo.isDone());
        newToDo.setPriority(toDo.getPriority());
        newToDo.setCreatedAt(LocalDateTime.now());
        newToDo.setUpdatedAt(LocalDateTime.now());
        if(toDo.getCategoryId() != null) {
            Category category = categoryRepository.findById(toDo.getCategoryId()).orElseThrow(() -> new IllegalArgumentException("Category not found"));
            newToDo.setCategory(category);
        }
        return toDoRepository.save(newToDo);
    }

    @Override
    public ToDo update(ToDo toDo, Long userId, Long toDoId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        User existingUser = user.get();
        Optional<ToDo> toDoOptional = toDoRepository.findById(toDoId);
        if (toDoOptional.isEmpty()) {
            throw new IllegalArgumentException("ToDo not found");
        }
        ToDo existingToDo = toDoOptional.get();

        toDo.setUser(existingUser);
        toDo.setCategory(existingToDo.getCategory());
        toDo.setUpdatedAt(LocalDateTime.now());
        toDo.setDescription(existingToDo.getDescription());
        toDo.setDueTo(existingToDo.getDueTo());
        toDo.setTitle(existingToDo.getTitle());
        return toDoRepository.save(toDo);
    }


    @Override
    public void delete(Long toDoId) {
        Optional<ToDo> toDoOptional = toDoRepository.findById(toDoId);
        if (toDoOptional.isEmpty()) {
            throw new IllegalArgumentException("ToDo not found");
        }
        toDoRepository.deleteById(toDoId);
    }
}
