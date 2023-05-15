package com.internship.atlantbh.auctionbackend.productauction;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/product-auctions")
public class ProductAuctionController {

    private final ProductAuctionService productAuctionService;

    public ProductAuctionController(ProductAuctionService productAuctionService) {
        this.productAuctionService = productAuctionService;
    }

    @GetMapping
    public Page<ProductAuction> findAllProductAuctions(
            @RequestParam(defaultValue = "0") final Integer pageNo,
            @RequestParam(defaultValue = "20") final Integer pageSize,
            @RequestParam(defaultValue = "startDate") final String sortBy)
    {

        return productAuctionService.findAllProductAuction(pageNo, pageSize, sortBy);
    }

    @GetMapping("/{id}")
    public Optional<ProductAuction> findProductAuctionById(@PathVariable("id") final UUID id) {
        return productAuctionService.findById(id);
    }
}
