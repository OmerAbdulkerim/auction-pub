package com.internship.atlantbh.auctionbackend.order;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public Iterable<Order> findAllOrders() {
        return orderService.findAllOrder();
    }

    @GetMapping("/{id}")
    public Optional<Order> findOrderById(@PathVariable("id") final UUID id) {
        return orderService.findById(id);
    }
}
