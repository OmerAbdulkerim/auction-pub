package com.internship.atlantbh.auctionbackend.category;

import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Iterable<Category> findAllCategories () {
        return categoryRepository.findAll();
    };

    public Set<Category> findAllParentCategories() {
        return categoryRepository.findByParentIdIsNull();
    }

    public Set<Category> findAllByParentId(final UUID id) {
        return categoryRepository.findAllByParentId(id);
    }

    public Optional<Category> findById(UUID id) {
        return categoryRepository.findById(id);
    };
}
