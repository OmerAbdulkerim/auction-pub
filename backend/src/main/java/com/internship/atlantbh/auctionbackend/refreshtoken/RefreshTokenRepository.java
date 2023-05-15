package com.internship.atlantbh.auctionbackend.refreshtoken;

import com.internship.atlantbh.auctionbackend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByToken(final UUID token);
    RefreshToken findByUser_Id(final UUID userId);
    boolean existsByUser_Id(final UUID userId);
    boolean existsByToken(final UUID token);

    @Modifying
    int deleteByUser(User user);

}
