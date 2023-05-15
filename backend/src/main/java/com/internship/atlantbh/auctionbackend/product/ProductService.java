package com.internship.atlantbh.auctionbackend.product;

import com.internship.atlantbh.auctionbackend.bid.Bid;
import com.internship.atlantbh.auctionbackend.bid.BidService;
import static com.internship.atlantbh.auctionbackend.helpers.QueryOperator.IN;
import static com.internship.atlantbh.auctionbackend.helpers.QueryOperator.LIKE;
import static com.internship.atlantbh.auctionbackend.helpers.QueryOperator.EQUALS;
import com.internship.atlantbh.auctionbackend.productauction.SellerProductInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductSpecificationRepository productSpecificationRepository;
    private final BidService bidService;

    public ProductService(ProductRepository productRepository, final ProductSpecificationRepository productSpecificationRepository, final BidService bidService) {
        this.productRepository = productRepository;
        this.productSpecificationRepository = productSpecificationRepository;
        this.bidService = bidService;
    }

    public Page<Product> findAllOrderByStartDate(final Integer pageNo, final Integer pageSize) {
        final Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, "productAuction.startDate"));
        return  productRepository.findAll(paging);
    }

    public Page<Product> findProductsBySoonestEndDate(final Integer pageNo, final Integer pageSize) {
        final Pageable paging = PageRequest.of(pageNo, pageSize);
        return  productRepository.findProductsBySoonestEndDate(paging);
    }

    public Product findCheapest() {
        return productRepository.findCheapest();
    }

    public Page<Product> findFiltered(final Integer pageNo, final Integer pageSize,final UUID parentCategoryId, final List<UUID> categoriesId, final String comparator) {
        List<ProductFilter> filters = new ArrayList<>();

        if (comparator != null) {
            final ProductFilter name = ProductFilter.builder()
                    .field("productName")
                    .value(comparator)
                    .operator(LIKE)
                    .build();
            filters.add(name);
        }

        if (categoriesId != null && categoriesId.size() > 0) {
                List<String> categoriesIdStrings = new ArrayList<>();
                categoriesId.forEach(el -> categoriesIdStrings.add(el.toString()));

                ProductFilter categories = ProductFilter.builder()
                        .field("category")
                        .secondaryField("id")
                        .values(categoriesIdStrings)
                        .operator(IN)
                        .build();
                filters.add(categories);
        }

        if (parentCategoryId != null) {
            ProductFilter parentCategory = ProductFilter.builder()
                    .field("category")
                    .secondaryField("parentId")
                    .value(parentCategoryId.toString())
                    .operator(EQUALS)
                    .build();
            filters.add(parentCategory);
        }

        return productSpecificationRepository.getQueryResult(filters, PageRequest.of(pageNo, pageSize, Sort.by("productName").descending()));
    }

    public Optional<Product> findById(final UUID id) {
        return productRepository.findById(id);
    }

    public Page<SellerProductInfo> findSoldByUserId(final Integer pageNo, final Integer pageSize, final UUID userId) {
        final Pageable paging = PageRequest.of(pageNo, pageSize);
        Page<Product> sold = productRepository.findFinishedByUserId(paging, userId);
        return sold.map(this::toSellerProductInfo);
    }

    public Page<SellerProductInfo> findActiveByUserId(final Integer pageNo, final Integer pageSize, final UUID userId) {
        final Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Product> active = productRepository.findActiveByUserId(pageable, userId);
        return active.map(this::toSellerProductInfo);
    }

    private SellerProductInfo toSellerProductInfo(final Product product) {
        int amount = bidService.findCountOfBidsByProductId(product.getId());
        Bid bid = bidService.findMaxBidByProductId(product.getId());
        double maxBidByProductId = bid == null ? product.getPrice() : bid.getPrice();
        return new SellerProductInfo(product, amount, maxBidByProductId);
    }

}
