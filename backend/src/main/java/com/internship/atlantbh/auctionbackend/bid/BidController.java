package com.internship.atlantbh.auctionbackend.bid;

import com.internship.atlantbh.auctionbackend.config.JwtUtil;
import com.internship.atlantbh.auctionbackend.helpers.ApiResponseOnFail;
import com.internship.atlantbh.auctionbackend.helpers.UnauthorizedRequestException;
import com.internship.atlantbh.auctionbackend.product.Product;
import com.internship.atlantbh.auctionbackend.product.ProductService;
import com.internship.atlantbh.auctionbackend.user.User;
import com.internship.atlantbh.auctionbackend.user.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/bids")
public class BidController {

    private final BidService bidService;
    private final ProductService productService;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public BidController(BidService bidService, final ProductService productService, final JwtUtil jwtUtil, final UserService userService) {
        this.bidService = bidService;
        this.productService = productService;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @GetMapping("/by-product")
    public Page<BidResponse> findAllByProductIdOrderByPriceDesc(
            @RequestParam(defaultValue = "0") final Integer pageNo,
            @RequestParam(defaultValue = "4") final Integer pageSize,
            @RequestParam("product-id") final UUID id,
            @RequestHeader(value = "Authorization") final String accessToken

    ) {
        String token = accessToken.split(" ")[1].trim();
        User user = userService.loadUserByUsername(jwtUtil.extractUsername(token));
        Product product = productService.findById(id).orElse(null);

        if (product == null) throw new NullPointerException();

        if (!user.getId().equals(product.getUserId())) {
            throw new UnauthorizedRequestException("You do not have the permissions to access this information!");
        }
        return bidService.findAllByProductIdOrderByPriceDesc(pageNo, pageSize, id);
    }

    @GetMapping("/by-user")
    public ResponseEntity<?> findAllByUserId(@RequestHeader(value = "Authorization") final String accessToken,
                                             @RequestParam(defaultValue = "0") final Integer pageNo,
                                             @RequestParam(defaultValue = "5") final Integer pageSize)
    {
        try {
            String token = accessToken.split(" ")[1].trim();
            User user = userService.loadUserByUsername(jwtUtil.extractUsername(token));
            if (user != null) {
                Page<BidsTableResponse> responseObject = bidService.findPaginatedRedactedBidsByUserId(pageNo, pageSize, user.getId());
                return ResponseEntity.status(HttpStatus.OK).body(responseObject);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseOnFail("Could not find user with this ID.", 3, "INVALID_USER"));
        } catch (ExpiredJwtException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponseOnFail("You are not authorized to perform this request!", 0, "UNAUTHORIZED"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findBidById(@PathVariable("id") final UUID id) {

        Bid bid = bidService.findById(id).orElse(null);
        if (bid == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NO BID");

        return ResponseEntity.status(HttpStatus.OK).body(new BidResponse(bid));
    }

    @GetMapping("/highest-by-product/{id}")
    public ResponseEntity<?> findRedactedBidsInfoByProductId(@PathVariable final UUID id) {

            Product product = productService.findById(id).orElse(null);

            if (product == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseOnFail("This product most likely does not have any bids or a product with this ID does not exist!", 2, "INVALID_PRODUCT"));
            }

            int numberOfBids = bidService.findCountOfBidsByProductId(id);
            Bid bid = bidService.findMaxBidByProductId(id);
            double highestBid = 0;
            UUID bidderId = null;
            if (bid != null)  {
                bidderId = bid.getUser().getId();
                highestBid = bid.getPrice();
            }
            else {
                return ResponseEntity.status(HttpStatus.OK).body(new RedactedBidResponse(highestBid, 0, id, null));
            }
            return ResponseEntity.status(HttpStatus.OK).body(new RedactedBidResponse(highestBid, numberOfBids, id, bidderId));
    }

    @PostMapping
    public ResponseEntity<?> saveBid(
            @RequestBody final BidRequest request,
            @RequestHeader(value = "Authorization") final String accessToken
    ) {
        try {
            double price = request.getPrice();
            UUID productId = request.getProductId();
            String token = accessToken.split(" ")[1].trim();
            Bid maxBid = bidService.findMaxBidByProductId(productId);
            double highestPrice = 0;

            Product product = productService.findById(productId).orElse(null);
            User user = userService.loadUserByUsername(jwtUtil.extractUsername(token));

            if (maxBid != null) {
                highestPrice = maxBid.getPrice();
            } else if (product != null) highestPrice = product.getPrice();

            if (price <= 0 || price <= highestPrice) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseOnFail("The price you entered is invalid. HINT: It must be greater than the current highest bid!" , 1, "INVALID_PRICE"));
            }

            if (product == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseOnFail( "Product with this ID does not exist!", 2, "INVALID_PRODUCT"));
            }

            if (user == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseOnFail("Could not find user with this ID.", 3, "INVALID_USER"));
            }

            if (product.getUserId() == user.getId())  {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseOnFail("Sellers can not bid on their own products!", 4, "SELLER"));
            }

            Bid bid = Bid.builder()
                    .product(product)
                    .user(user)
                    .price(price)
                    .build();

            Bid saved = bidService.saveBid(bid);
            return ResponseEntity.status(HttpStatus.OK).body(new BidResponse(saved));
        } catch (ExpiredJwtException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponseOnFail("You are not authorized to perform this request!", 0, "UNAUTHORIZED"));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("DAM");
        }
    }

    @ExceptionHandler({ExpiredJwtException.class, UnauthorizedRequestException.class, MissingRequestHeaderException.class})
    public ResponseEntity<?> expiredJwtEx(WebRequest webRequest, Exception ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponseOnFail("You are not authorized to perform this request!", 0, "UNAUTHORIZED"));
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<?> nullPointerEx(WebRequest webRequest, Exception ex) {
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseOnFail("Product with this ID does not exist!", 2, "INVALID_PRODUCT"));
    }
}
