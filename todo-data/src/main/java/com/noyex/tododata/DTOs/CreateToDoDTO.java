package com.noyex.tododata.DTOs;

import com.noyex.tododata.model.Priority;
import lombok.Data;

import java.time.LocalDateTime;


public class CreateToDoDTO {
    private String title;
    private String description;
    private Long categoryId;
    private boolean done;
    private LocalDateTime dueTo;
    private Priority priority;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public LocalDateTime getDueTo() {
        return dueTo;
    }

    public void setDueTo(LocalDateTime dueTo) {
        this.dueTo = dueTo;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }
}
