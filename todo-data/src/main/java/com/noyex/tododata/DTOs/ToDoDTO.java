package com.noyex.tododata.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.noyex.tododata.model.Priority;

import java.time.LocalDateTime;


public class ToDoDTO {
    private String title;
    private String description;
    @JsonProperty("category_id")
    private Long categoryId;
    private boolean done;
    @JsonProperty("due_to")
    private LocalDateTime dueTo;
    private Priority priority;
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
