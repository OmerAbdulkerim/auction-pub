package com.internship.atlantbh.auctionbackend.image;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProductImageRepository extends CrudRepository<ProductImage, UUID> {

}
