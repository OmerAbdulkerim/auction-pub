package com.internship.atlantbh.auctionbackend.user;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, UUID> {

    Optional<User> findByUsernameIgnoreCase(final String username);
    Optional<User> findByEmailIgnoreCase(final String email);
    boolean existsByUsernameIgnoreCase(final String username);
    boolean existsByEmailIgnoreCase(final String email);
}
