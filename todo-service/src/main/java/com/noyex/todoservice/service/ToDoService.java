package com.noyex.todoservice.service;

import com.noyex.tododata.DTOs.ToDoDTO;
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
    public List<ToDo> getListOfAllToDos() {
        return toDoRepository.findAll();
    }

    @Override
    public ToDo saveForUser(ToDoDTO toDo, Long userId) {
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
    public ToDo update(ToDoDTO toDo, Long toDoId) {
        Optional<ToDo> toDoOptional = toDoRepository.findById(toDoId);
        if (toDoOptional.isEmpty()) {
            throw new IllegalArgumentException("ToDo not found");
        }
        ToDo existingToDo = toDoOptional.get();

        existingToDo.setTitle(toDo.getTitle());
        existingToDo.setDescription(toDo.getDescription());
        existingToDo.setDueTo(toDo.getDueTo());
        existingToDo.setDone(toDo.isDone());
        existingToDo.setPriority(toDo.getPriority());
        existingToDo.setUpdatedAt(LocalDateTime.now());
        if(toDo.getCategoryId() != null) {
            Category category = categoryRepository.findById(toDo.getCategoryId()).orElseThrow(() -> new IllegalArgumentException("Category not found"));
            existingToDo.setCategory(category);
        }
        return toDoRepository.save(existingToDo);
    }


    @Override
    public void delete(Long toDoId) {
        Optional<ToDo> toDoOptional = toDoRepository.findById(toDoId);
        if (toDoOptional.isEmpty()) {
            throw new IllegalArgumentException("ToDo not found");
        }
        toDoRepository.deleteById(toDoId);
    }

    @Override
    public void markAsDone(Long toDoId) {
        Optional<ToDo> toDoOptional = toDoRepository.findById(toDoId);
        if (toDoOptional.isEmpty()) {
            throw new IllegalArgumentException("ToDo not found");
        }
        ToDo existingToDo = toDoOptional.get();
        existingToDo.setDone(!existingToDo.isDone());
        if(existingToDo.getCompletedAt() == null) {
            existingToDo.setCompletedAt(LocalDateTime.now());
        } else {
            existingToDo.setCompletedAt(null);
        }
        toDoRepository.save(existingToDo);
    }

    @Override
    public List<ToDo> getDoneToDosByUserId(Long userId) {
        return toDoRepository.findByUserIdAndDoneIsTrue(userId);
    }

    @Override
    public List<ToDo> getNotDoneToDosByUserId(Long userId) {
        return toDoRepository.findByUserIdAndDoneIsFalse(userId);
    }


}
