package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.config.security.CustomUserDetails;
import com.example.digitalstockbackend.config.security.jwt.JwtUtils;
import com.example.digitalstockbackend.dto.*;
import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.model.Wishlist;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.model.roles.ERole;
import com.example.digitalstockbackend.model.roles.Role;
import com.example.digitalstockbackend.model.Order;

import com.example.digitalstockbackend.repository.RoleRepository;
import com.example.digitalstockbackend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final UserService userService;


    @Autowired
    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        // Create the cookie
        ResponseCookie cookie = ResponseCookie.from("authToken", jwt)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .sameSite("Strict")
                .build();

        JwtResponse jwtResponse = new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(jwtResponse);
    }


    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        CustomUser user = new CustomUser(
                signUpRequest.getEmail(),
                signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword())
        );

        String role;
        if (signUpRequest.getRole() == null) {
            role = ERole.ROLE_USER.name();
        } else {
            role = switch (signUpRequest.getRole()) {
                case "ROLE_ADMIN" -> ERole.ROLE_ADMIN.name();
                case "ROLE_GUEST" -> ERole.ROLE_GUEST.name();
                default -> ERole.ROLE_USER.name();
            };
        }

        user.setUserRole(role);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = ResponseCookie.from("authToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("Logged out successfully"));
    }


    public ResponseEntity<?> fetchUser(@CookieValue(value = "authToken", required = false) String token) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        try {
            String username = jwtUtils.getUserNameFromJwtToken(token);
            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            CustomUser userDetails = userService.getUserByUsername(username);
            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }

            UserDTO userDTO = convertToUserDTO(userDetails);

            return ResponseEntity.ok(userDTO);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Error validating token or fetching user details");
        }
    }

    private UserDTO convertToUserDTO(CustomUser user) {
        WishlistDTO wishlistDTO = user.getWishlist() != null ? convertToWishlistDTO(user.getWishlist()) : null;
        CartDTO cartDTO = user.getCart() != null ? convertToCartDTO(user.getCart()) : null;
        List<OrderDTO> orderDTOs = user.getUserOrders().stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());

        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getUserRole(),
                wishlistDTO,
                cartDTO,
                orderDTOs
        );
    }

    private WishlistDTO convertToWishlistDTO(Wishlist wishlist) {
        List<WishlistItemDTO> items = wishlist.getItems().stream()
                .map(item -> new WishlistItemDTO(
                        item.getId(),
                        item.getProduct().getId(),
                        item.getProduct().getName()))
                .collect(Collectors.toList());
        return new WishlistDTO(wishlist.getId(), items);
    }

    private CartDTO convertToCartDTO(Cart cart) {
        List<CartItemDTO> items = cart.getItems().stream()
                .map(item -> new CartItemDTO(
                        item.getId(),
                        new ProductDTO( item.getProduct()),
                        item.getQuantity()))
                .collect(Collectors.toList());
        return new CartDTO(cart.getId(), items);
    }

    private OrderDTO convertToOrderDTO(Order order) {
        return getOrderDTO(order);
    }

    static OrderDTO getOrderDTO(Order order) {
        List<OrderItemDTO> items = order.getOrderItems().stream()
                .map(item -> new OrderItemDTO(
                        item.getId(),
                        new ProductDTO(item.getProduct()),
                        item.getQuantity()))
                .collect(Collectors.toList());

        return new OrderDTO(
                order.getId(),
                order.getStatus().toString(),
                order.getOrderDate(),
                order.getAddressLine(),
                order.getCity(),
                order.getState(),
                order.getZipCode(),
                items
        );
    }

}
