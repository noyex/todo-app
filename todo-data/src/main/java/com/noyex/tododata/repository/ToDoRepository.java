package com.noyex.tododata.repository;

import com.noyex.tododata.model.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToDoRepository extends JpaRepository<ToDo, Long> {
    List<ToDo> findByUserId(Long userId);
    List<ToDo> findByUserIdAndDone(Long userId, boolean done);
}
