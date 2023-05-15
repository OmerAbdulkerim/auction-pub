package com.internship.atlantbh.auctionbackend.auth;

import com.internship.atlantbh.auctionbackend.config.JwtUtil;
import com.internship.atlantbh.auctionbackend.helpers.FormValidationRequestException;
import com.internship.atlantbh.auctionbackend.helpers.PasswordEncoderCustom;
import com.internship.atlantbh.auctionbackend.refreshtoken.RefreshToken;
import com.internship.atlantbh.auctionbackend.refreshtoken.RefreshTokenService;
import com.internship.atlantbh.auctionbackend.refreshtoken.TokenRefreshException;
import com.internship.atlantbh.auctionbackend.role.Role;
import com.internship.atlantbh.auctionbackend.role.RoleService;
import com.internship.atlantbh.auctionbackend.user.User;
import com.internship.atlantbh.auctionbackend.user.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    final String PATTERN_EMAIL = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
    final String PATTERN_NAME = "^([A-Z])([a-z]{1,31})$";
    final String PATTERN_LAST_NAME = "^([A-Z])([a-z]{1,100})$";
    final String PATTERN_PASSWORD = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";
    final String PATTERN_USERNAME = "^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final PasswordEncoderCustom passwordEncoderCustom;
    private final RoleService roleService;
    private final RefreshTokenService refreshTokenService;

    public AuthController(final UserService userService, final JwtUtil jwtUtil, final AuthenticationManager authenticationManager, final PasswordEncoderCustom passwordEncoderCustom, final RoleService roleService, final RefreshTokenService refreshTokenService) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.passwordEncoderCustom = passwordEncoderCustom;
        this.roleService = roleService;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getEmail(), request.getPassword()
                            )
                    );
            User user = (User) authenticate.getPrincipal();
            String jwt = jwtUtil.generateToken(user);
            boolean existsByUser = refreshTokenService.checkIfExistsByUser(user.getId());

            RefreshToken refreshToken;

            if (existsByUser && refreshTokenService.isValid(refreshTokenService.findByUserId(user.getId()))) {
                    refreshToken = refreshTokenService.findByUserId(user.getId());
            } else {
                refreshToken = refreshTokenService.createRefreshToken(user.getId());
            }

            ResponseCookie responseCookie = ResponseCookie.from("refreshToken", refreshToken.getToken().toString()).httpOnly(true).build();
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.SET_COOKIE,
                            responseCookie.toString()
                    )
                    .body(new JwtResponse(jwt, "[REDACTED]", user.getId(), user.getUsername(), user.getEmail(), user.getAuthorities()));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new FormValidationRequestException("EMAIL_PATTERN_MISMATCH", "EMAIL"));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new FormValidationRequestException("PASSWORD_PATTERN_MISMATCH", "PASSWORD"));
        } catch (TokenRefreshException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new FormValidationRequestException("REFRESH_TOKEN_INVALID", "REFRESH_TOKEN"));
        }
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken (@CookieValue(name = "refreshToken", defaultValue = "default") final UUID request) {

        Optional<RefreshToken> optional = refreshTokenService.findByToken(request);

        if (optional.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("INVALID");

        RefreshToken refreshToken = optional.get();
        boolean isValid = refreshTokenService.isValid(refreshToken);

        if (isValid) {
            User user = refreshToken.getUser();
            String token = jwtUtil.generateToken(user);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, request.toString())
                    .body(new JwtResponse(token, "[REDACTED]", user.getId(), user.getUsername(), user.getEmail(), user.getAuthorities()));
        }
        else return ResponseEntity.status(HttpStatus.FORBIDDEN).body("EXPIRED");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (!request.getEmail().matches(PATTERN_EMAIL)) throw new FormValidationRequestException("EMAIL_PATTERN_MISMATCH", "EMAIL");
            if (!request.getUsername().matches(PATTERN_USERNAME)) throw new FormValidationRequestException("USERNAME_PATTERN_MISMATCH", "USERNAME");
            if (!request.getFirstName().matches(PATTERN_NAME)) throw new FormValidationRequestException("NAME_PATTERN_MISMATCH", "NAME");
            if (!request.getLastName().matches(PATTERN_LAST_NAME)) throw new FormValidationRequestException("LAST_NAME_PATTERN_MISMATCH", "LAST_NAME");
            if (!request.getPassword().matches(PATTERN_PASSWORD)) throw new FormValidationRequestException("PASSWORD_PATTERN_MISMATCH", "PASSWORD");

            if (userService.existsByUsernameOrExistsByEmail(request.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("EMAIL");
            }
            if (userService.existsByUsernameOrExistsByEmail(request.getUsername())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("USERNAME");
            }

            Set<Role> roles = roleService.findByRoleName("ROLE_USER");

            User user = User.builder()
                    .username(request.getUsername())
                    .email(request.getEmail())
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .password(passwordEncoderCustom.getPasswordEncoder().encode(request.getPassword()))
                    .roles(roles)
                    .build();


            User fromRepo = userService.saveUser(user);

            String jwt = jwtUtil.generateToken(fromRepo);
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(fromRepo.getId());
            ResponseCookie responseCookie = ResponseCookie.from("refreshToken", refreshToken.getToken().toString()).httpOnly(true).build();

            return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(new JwtResponse(jwt, "[REDACTED]", user.getId(), user.getUsername(), user.getEmail(), user.getAuthorities()));
        } catch (FormValidationRequestException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex);
        }
    }
}
