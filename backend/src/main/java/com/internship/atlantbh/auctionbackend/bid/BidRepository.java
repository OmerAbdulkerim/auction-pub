package com.internship.atlantbh.auctionbackend.bid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BidRepository extends PagingAndSortingRepository<Bid, UUID> {

    Page<Bid> findAllByProductIdOrderByPriceDesc(Pageable page, @Param("product_id") final UUID id);

    Bid findFirstByProduct_IdOrderByPriceDesc(final UUID id);

    int countAllByProduct_Id(final UUID id);

    Page<Bid> findAllByUser_Id(final UUID id, final Pageable pageable);
}
