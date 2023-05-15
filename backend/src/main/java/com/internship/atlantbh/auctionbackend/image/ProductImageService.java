package com.internship.atlantbh.auctionbackend.image;

import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ProductImageService {

    private final ProductImageRepository productImageRepository;

    public ProductImageService(ProductImageRepository productImageRepository) {
        this.productImageRepository = productImageRepository;
    }

    public Optional<ProductImage> findById(UUID id) {
        return productImageRepository.findById(id);
    }
}
