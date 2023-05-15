package com.internship.atlantbh.auctionbackend.productauction;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ProductAuctionService {

    private final ProductAuctionRepository productAuctionRepository;

    public ProductAuctionService(ProductAuctionRepository productAuctionRepository) {
        this.productAuctionRepository = productAuctionRepository;
    }

    public Page<ProductAuction> findAllProductAuction(Integer pageNo, Integer pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, sortBy));
        return productAuctionRepository.findAll(paging);
    }

    public Optional<ProductAuction> findById(UUID id) {
        return productAuctionRepository.findById(id);
    }
}
