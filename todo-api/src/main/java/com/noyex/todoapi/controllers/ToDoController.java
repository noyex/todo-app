package com.noyex.todoapi.controllers;


import com.noyex.tododata.model.ToDo;
import com.noyex.todoservice.service.IToDoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todos")
public class ToDoController {

    private final IToDoService toDoService;

    public ToDoController(IToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<?> getAllToDosByUserId(@PathVariable Long userId){
        return ResponseEntity.ok(toDoService.getListOfToDosByUserId(userId));
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addToDoForUser(@RequestBody ToDo toDo, @PathVariable Long userId){
        return ResponseEntity.ok(toDoService.saveForUser(toDo, userId));
    }

}
