package com.noyex.todoservice.service;

import com.noyex.tododata.model.Category;
import com.noyex.tododata.repository.CategoryRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CategoryService implements ICategoryService{

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public Category updateCategory(Category category, Long categoryId) {
        Optional<Category> optionalCategory =  categoryRepository.findById(categoryId);
        if(optionalCategory.isPresent()){
            Category categoryToUpdate = optionalCategory.get();
            categoryToUpdate.setName(category.getName());
            categoryToUpdate.setColor(category.getColor());
            return categoryRepository.save(categoryToUpdate);
        } else {
            throw new RuntimeException("Category not found");
        }
    }
}
