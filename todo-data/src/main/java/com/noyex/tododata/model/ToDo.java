package com.noyex.tododata.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

@Entity
@Data
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
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "category_id")
    private Category category;

    private boolean done;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"todos", "password", "lastLoginDate", "createdAt"})
    private User user;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    private LocalDateTime updatedAt;
    private LocalDateTime dueTo;

    @Enumerated(EnumType.STRING)
    private Priority priority;


    public void setPriority(Priority priority) {
        if (priority == null) {
            throw new IllegalArgumentException("Priority cannot be null");
        }

        LocalDateTime dueTo = getDueTo();
        LocalDateTime now = LocalDateTime.now();

        if (now.isAfter(dueTo) || now.isEqual(dueTo)) {
            this.priority = Priority.URGENT;
            return;
        }

        this.priority = priority;
    }
}
