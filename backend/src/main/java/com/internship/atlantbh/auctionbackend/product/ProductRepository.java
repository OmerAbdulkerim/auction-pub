package com.internship.atlantbh.auctionbackend.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Component
@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, UUID>, JpaSpecificationExecutor<Product> {

    //Landing page top product
    @Query(value = "SELECT p FROM Product p WHERE p.price = (SELECT MIN(price) FROM Product)")
    Product findCheapest();

    @Query (
            value = "SELECT p " +
                    "FROM Product p " +
                    "WHERE p.productAuction.endDate > CURRENT_TIMESTAMP " +
                    "ORDER BY p.productAuction.endDate ASC"
    )
    Page<Product> findProductsBySoonestEndDate(final Pageable pageable);

    @Query(
            value = "SELECT p " +
                    "FROM Product p " +
                    "WHERE p.productAuction.endDate < CURRENT_TIMESTAMP " +
                    "AND p.userId = :userId " +
                    "ORDER BY p.productAuction.endDate ASC"
    )
    Page<Product> findFinishedByUserId(final Pageable pageable,@Param("userId") final UUID userId);

    @Query(
            value = "SELECT p " +
                    "FROM Product p " +
                    "WHERE p.productAuction.endDate > CURRENT_TIMESTAMP " +
                    "AND p.userId = :userId " +
                    "ORDER BY p.productAuction.endDate ASC"
    )
    Page<Product> findActiveByUserId(final Pageable pageable,@Param("userId") final UUID userId);
}
