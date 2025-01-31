package com.noyex.todoservice.service;

import com.noyex.tododata.model.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategories();
    Category saveCategory(Category category);
    void deleteCategory(Long categoryId);
    Category updateCategory(Category category, Long categoryId);
}
