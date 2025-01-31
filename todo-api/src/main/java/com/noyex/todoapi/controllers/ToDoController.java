package com.noyex.todoapi.controllers;


import com.noyex.tododata.DTOs.ToDoDTO;
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

    @GetMapping("/all")
    public ResponseEntity<?> getAllToDos(){
        return ResponseEntity.ok(toDoService.getListOfAllToDos());
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addToDoForUser(@RequestBody ToDoDTO toDo, @PathVariable Long userId){
        return ResponseEntity.ok(toDoService.saveForUser(toDo, userId));
    }

    @DeleteMapping("/delete/{toDoId}")
    public ResponseEntity<?> deleteToDoById(@PathVariable Long toDoId){
        toDoService.delete(toDoId);
        return ResponseEntity.ok("Deleted");
    }
    @PutMapping("/update/{toDoId}")
    public ResponseEntity<?> updateToDoById(@RequestBody ToDoDTO toDo, @PathVariable Long toDoId){
        return ResponseEntity.ok(toDoService.update(toDo, toDoId));
    }


}
