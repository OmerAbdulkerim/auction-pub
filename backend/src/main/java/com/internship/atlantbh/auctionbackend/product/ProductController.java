package com.internship.atlantbh.auctionbackend.product;

import com.internship.atlantbh.auctionbackend.config.JwtUtil;
import com.internship.atlantbh.auctionbackend.helpers.ApiResponseOnFail;
import com.internship.atlantbh.auctionbackend.productauction.SellerProductInfo;
import com.internship.atlantbh.auctionbackend.user.User;
import com.internship.atlantbh.auctionbackend.user.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public ProductController(ProductService productService, final UserService userService, final JwtUtil jwtUtil) {
        this.productService = productService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public Page<Product> findAllProducts(
            @RequestParam(defaultValue = "0") final Integer pageNo,
            @RequestParam(defaultValue = "8") final Integer pageSize
    ) {
        return productService.findFiltered(pageNo, pageSize, null, null, null);
    }

    @GetMapping("/latest")
    public Page<Product> findLatest(
            @RequestParam(defaultValue = "0") final Integer pageNo,
            @RequestParam(defaultValue = "8") final Integer pageSize
    ) {
        return productService.findAllOrderByStartDate(pageNo, pageSize);
    }

    @GetMapping("/last-chance")
    public Page<Product> findProductsBySoonestEndDate(
            @RequestParam(defaultValue = "0") final Integer pageNo,
            @RequestParam(defaultValue = "8") final Integer pageSize
    ) {
        return productService.findProductsBySoonestEndDate(pageNo, pageSize);
    }

    @GetMapping("/cheapest")
    public Product findCheapestProduct() {
        return productService.findCheapest();
    }

    @GetMapping("/{id}")
    public Optional<Product> findById(@PathVariable("id") final UUID id) {
        return productService.findById(id);
    }

    @GetMapping("/filter")
    public Page<Product> findByCategoriesId(
            @RequestParam(defaultValue = "0 ") final Integer pageNo,
            @RequestParam(defaultValue = "8") final Integer pageSize,
            @RequestParam(required = false, name = "category-ids") final List<UUID> ids,
            @RequestParam(required = false, name = "parent-category") final UUID parentId,
            @RequestParam(required = false, name = "comparator") final String comparator
    ) {
        return productService.findFiltered(pageNo, pageSize, parentId, ids, comparator);
    }

    @GetMapping("/{userId}/products-overview")
    public ResponseEntity<?> getProductsOverviewByStatus(
            @PathVariable final UUID userId,
            @RequestHeader(value = "Authorization") final String bearer,
            @RequestParam(defaultValue = "0") final Integer pageNo,
            @RequestParam(defaultValue = "9") final Integer pageSize,
            @RequestParam(defaultValue = "MISSING") final String status
    ) {
        try {
            String token = bearer.split(" ")[1].trim();
            User user = userService.loadUserByUsername(jwtUtil.extractUsername(token));

            if (!user.getId().equals(userId)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponseOnFail("You are not authorized to perform this request!", 0, "FORBIDDEN"));
            if (status.equals("SOLD")) {
                Page<SellerProductInfo> finishedByUserid = productService.findSoldByUserId(pageNo, pageSize, userId);
                return ResponseEntity.status(HttpStatus.OK).body(finishedByUserid);
            } else if (status.equals("ACTIVE")){
                Page<SellerProductInfo> activeByUserId = productService.findActiveByUserId(pageNo, pageSize, userId);
                return ResponseEntity.ok().body(activeByUserId);
            } else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseOnFail("Wrong request parameters!", 20, "INCORRECT_PARAMETERS"));
        } catch (ExpiredJwtException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponseOnFail("You are not authorized to perform this request!", 22, "TOKEN_EXPIRED"));
        }
    }
}
