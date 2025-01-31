package com.noyex.tododata.repository;


import com.noyex.tododata.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
