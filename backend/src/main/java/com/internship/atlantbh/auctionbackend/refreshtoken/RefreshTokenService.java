package com.internship.atlantbh.auctionbackend.refreshtoken;

import com.internship.atlantbh.auctionbackend.user.UserService;
import org.hibernate.StaleStateException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    //private final long JWT_REFRESH_TOKEN_VALIDITY = 1000 * 60 * 60 * 48L;
    private final long JWT_REFRESH_TOKEN_VALIDITY = 1000 * 60 * 60 * 24;


    private final RefreshTokenRepository refreshTokenRepository;

    private final UserService userService;

    public RefreshTokenService(final RefreshTokenRepository refreshTokenRepository, final UserService userService) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userService = userService;
    }

    public Optional<RefreshToken> findByToken (final UUID token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken (final UUID userId) {

        RefreshToken refreshToken = RefreshToken
                .builder()
                .user(userService.findById(userId))
                .expiryDate(Timestamp.from(Instant.now().plusMillis(JWT_REFRESH_TOKEN_VALIDITY)))
                .token(UUID.randomUUID())
                .build();

        refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken findByUserId(final UUID userId) {
        return refreshTokenRepository.findByUser_Id(userId);
    }

    public boolean checkIfExistsByUser (final UUID userId) {
        return refreshTokenRepository.existsByUser_Id(userId);
    }

    public boolean existsByToken (final UUID token) {
        return refreshTokenRepository.existsByToken(token);
    }

    public boolean isValid(final RefreshToken refreshToken) {
        try {

            if (!refreshTokenRepository.existsByToken(refreshToken.getToken())) {
                return false;
            }
            else if (refreshToken.getExpiryDate().toInstant().compareTo(Instant.now()) < 0) {
                refreshTokenRepository.deleteById(refreshToken.getId());
                return false;
            }
            return true;

        } catch (StaleStateException ex) {
            throw new TokenRefreshException(refreshToken.getToken().toString(), "Refresh token was expired. Please generate a new one!");
        }
    }

    @Transactional
    public int deleteByUserId(UUID userId) {
        return refreshTokenRepository.deleteByUser(userService.findById(userId));
    }
}
