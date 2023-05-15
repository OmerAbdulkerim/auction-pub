package com.internship.atlantbh.auctionbackend.category;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public Iterable<Category> findAllCategories() {
        return categoryService.findAllCategories();
    }

    @GetMapping("/parents")
    public Set<Category> findAllParentCategories() {
        return categoryService.findAllParentCategories();
    }

    @GetMapping("/{id}")
    public Optional<Category> findCategoryById(@PathVariable("id") final UUID id) {
        return categoryService.findById(id);
    }

    @GetMapping("/by-parent/{id}")
    public Set<Category> findByParentId(@PathVariable("id") final UUID id) {
        return categoryService.findAllByParentId(id);
    }
}
