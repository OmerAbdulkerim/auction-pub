package com.internship.atlantbh.auctionbackend.bid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class BidService {

    private final BidRepository bidRepository;

    public BidService(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    public Page<BidResponse> findAllByProductIdOrderByPriceDesc(final Integer pageNo, final Integer pageSize, final UUID id) {
        final Pageable paging = PageRequest.of(pageNo, pageSize);
        Page<Bid> page = bidRepository.findAllByProductIdOrderByPriceDesc(paging, id);
        return page.map(BidService::bidPageToBidResponsePage);
    }

    public Optional<Bid> findById(UUID id) {
        return bidRepository.findById(id);
    }

    public Bid saveBid(Bid bid) {
        return bidRepository.save(bid);
    }

    public Bid findMaxBidByProductId( final UUID productId) {
        return bidRepository.findFirstByProduct_IdOrderByPriceDesc(productId);
    }

    public int findCountOfBidsByProductId(final UUID id) {
        return bidRepository.countAllByProduct_Id(id);
    }

    private static BidResponse bidPageToBidResponsePage(final Bid bid) {
        return new BidResponse(bid);
    }

    public Page<Bid> findByUserId(final Integer pageNo, final Integer pageSize, final UUID id) {
        return bidRepository.findAllByUser_Id(id, PageRequest.of(pageNo, pageSize));
    }

    public Page<BidsTableResponse> findPaginatedRedactedBidsByUserId(final Integer pageNo, final Integer pageSize, final UUID id) {
        Page<Bid> bids = bidRepository.findAllByUser_Id(id, PageRequest.of(pageNo, pageSize));
        return bids.map(this::toBidsTableResponse);
    }

    private BidsTableResponse toBidsTableResponse(final Bid bid) {
        return BidsTableResponse.builder()
                .bidId(bid.getId())
                .productName(bid.getProduct().getProductName())
                .myBid(bid.getProduct().getPrice())
                .highestBid(findMaxBidByProductId(bid.getProduct().getId()).getPrice())
                .totalBids(findCountOfBidsByProductId(bid.getProduct().getId()))
                .endDate(bid.getProduct().getProductAuction().getEndDate())
                .productId(bid.getProduct().getId())
                .imageUrls(bid.getProduct().getProductImages())
                .build();
    }
}
