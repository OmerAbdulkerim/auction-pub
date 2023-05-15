package com.internship.atlantbh.auctionbackend.address;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    public Iterable<Address> findAllAddresses() {
        return addressService.findAllAddress();
    }

    @GetMapping("/{id}")
    public Optional<Address> findAddressById(@PathVariable("id") final UUID id) {
        return addressService.findById(id);
    }

}
