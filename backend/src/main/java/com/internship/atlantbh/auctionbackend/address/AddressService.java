package com.internship.atlantbh.auctionbackend.address;

import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Iterable<Address> findAllAddress() {
        return addressRepository.findAll();
    }

    public Optional<Address> findById(final UUID id) {
        return addressRepository.findById(id);
    }

    public Address updateAddress(Address address) {
        return addressRepository.save(address);
    }

    public Address saveAddress(Address address) {
        return addressRepository.save(address);
    }
}
