package com.internship.atlantbh.auctionbackend.category;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface CategoryRepository extends CrudRepository<Category, UUID> {

    Set<Category> findByParentIdIsNull();

    Set<Category> findAllByParentId(@Param("parent_id") final UUID id);
}
