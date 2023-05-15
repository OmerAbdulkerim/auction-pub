package com.internship.atlantbh.auctionbackend.user;

import com.internship.atlantbh.auctionbackend.address.RedactedAddress;
import com.internship.atlantbh.auctionbackend.card.RedactedCard;
import com.internship.atlantbh.auctionbackend.config.JwtUtil;
import com.internship.atlantbh.auctionbackend.helpers.ApiResponseOnFail;
import com.internship.atlantbh.auctionbackend.helpers.FormValidationRequestException;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, final JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public Page<User> findAllUsers(
            @RequestParam(defaultValue = "0") final Integer pageNo,
            @RequestParam(defaultValue = "9") final Integer pageSize
    ) {
        return userService.findAllUsers(pageNo, pageSize);
    }

    @GetMapping("/{id}")
    public User findUserById(@PathVariable("id") final UUID id) {
        return userService.findById(id);
    }

    @GetMapping("/user/all-info")
    public ResponseEntity<?> getAllAccountInfo(@RequestHeader(value = "Authorization") final String accessToken) {
        try {
            String token = accessToken.split(" ")[1].trim();
            User user = userService.loadUserByUsername(jwtUtil.extractUsername(token));
            if (user != null) {
                RedactedAddress address = user.getShippingAddress() != null ?  RedactedAddress.builder()
                        .street(user.getShippingAddress().getStreet())
                        .city(user.getShippingAddress().getCity())
                        .country(user.getShippingAddress().getCountry())
                        .state(user.getShippingAddress().getState())
                        .zipCode(user.getShippingAddress().getZipCode())
                        .build() : null;

                RedactedUser redactedUser = RedactedUser.builder()
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .phone(user.getPhoneNumber())
                        .email(user.getEmail())
                        .dateOfBirth(user.getDateOfBirth())
                        .profilePictureUrl(user.getProfilePictureUrl())
                        .build();

                RedactedCard redactedCard = user.getCard() != null ? RedactedCard.builder()
                        .name(user.getCard().getCardHolder())
                        .cvv(user.getCard().getCvv())
                        .month(user.getCard().getExpirationMonth())
                        .year(user.getCard().getExpirationYear())
                        .number(user.getCard().getCardNumber())
                        .build() : null;
                return ResponseEntity.status(HttpStatus.OK).body(new AccountInformation(redactedUser, address, redactedCard));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseOnFail("Could not find user with this ID.", 3, "INVALID_USER"));
        } catch (ExpiredJwtException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponseOnFail("You are not authorized to perform this request!", 22, "TOKEN_EXPIRED"));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAccountInfo(
            @RequestBody final AccountInformation accountInformation,
            @RequestHeader(value = "Authorization") final String bearer
    ) {
        try {
            User user = tryGetUserFromBearer(bearer);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponseOnFail("Authorization error!.", 4, "AUTHORIZATION_ERROR"));
            }

            AccountInformation updatedAccountInformation = userService.updateInformation(accountInformation, user);

            if (updatedAccountInformation == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponseOnFail("Missing one or more required fields!", 44, "MISSING_FIELD_VALUES"));
            }
            return ResponseEntity.status(HttpStatus.OK).body(updatedAccountInformation);
        } catch (ExpiredJwtException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponseOnFail("You are not authorized to perform this request!", 22, "TOKEN_EXPIRED"));
        } catch (FormValidationRequestException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseOnFail(ex.getMessage(), 66, ex.getFieldName()));
        }
    }

    private User tryGetUserFromBearer(final String bearer) {
        String token = bearer.split(" ")[1].trim();
        return userService.loadUserByUsername(jwtUtil.extractUsername(token));
    }
}
