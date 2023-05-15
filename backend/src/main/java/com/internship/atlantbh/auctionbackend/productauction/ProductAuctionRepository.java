package com.internship.atlantbh.auctionbackend.productauction;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProductAuctionRepository extends PagingAndSortingRepository<ProductAuction, UUID> {
}
