package com.noyex.tododata.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity

@Table(indexes = {
        @Index(name = "idx_todo_user", columnList = "user_id"),
        @Index(name = "idx_todo_due_to", columnList = "dueTo"),
        @Index(name = "idx_todo_created_at", columnList = "createdAt")
})
public class ToDo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 1, max = 100, message = "Title must be between 1 and 100 characters")
    private String title;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @ManyToOne
    private Category category;

    private boolean done;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    private LocalDateTime updatedAt;
    private LocalDateTime dueTo;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    public ToDo() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
