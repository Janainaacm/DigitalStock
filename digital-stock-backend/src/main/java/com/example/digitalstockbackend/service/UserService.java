package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.*;
import com.example.digitalstockbackend.exception.UserNotFoundException;
import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.Wishlist;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.repository.CartRepository;
import com.example.digitalstockbackend.repository.UserRepository;
import com.example.digitalstockbackend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final WishlistRepository wishlistRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, CartRepository cartRepository, WishlistRepository wishlistRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.cartRepository = cartRepository;
        this.wishlistRepository = wishlistRepository;
    }

    // Fetch User by ID
    public ResponseEntity<UserDTO> fetchUserById(Long id) {
        return userRepository.findById(id)
                .map(this::convertToUserDTO)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public ResponseEntity<UserDTO> updateUserProfile(Long userId, CustomUser userDetails) {
        CustomUser updatedUser = userRepository.findById(userId)
                .map(user -> {
                    user.setEmail(userDetails.getEmail());
                    user.setUsername(userDetails.getUsername());
                    if (userDetails.getPassword() != null) {
                        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
                    }
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return ResponseEntity.ok(convertToUserDTO(updatedUser));
    }

    public ResponseEntity<Void> deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    public CustomUser getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));
    }

    public CustomUser getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email " + email + " not found"));
    }

    public CustomUser getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private UserDTO convertToUserDTO(CustomUser user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getUserRole(),
                user.getWishlist() != null ? convertToWishlistDTO(user.getWishlist()) : null,
                user.getCart() != null ? convertToCartDTO(user.getCart()) : null,
                user.getUserOrders().stream()
                        .map(this::convertToOrderDTO)
                        .collect(Collectors.toList())
        );
    }

    private WishlistDTO convertToWishlistDTO(Wishlist wishlist) {
        List<WishlistItemDTO> items = wishlist.getItems().stream()
                .map(item -> new WishlistItemDTO(
                        item.getId(),
                        new ProductDTO(item.getProduct())))
                .collect(Collectors.toList());
        return new WishlistDTO(wishlist.getId(), items);
    }

    private CartDTO convertToCartDTO(Cart cart) {
        List<CartItemDTO> items = cart.getItems().stream()
                .map(item -> new CartItemDTO(
                        item.getId(),
                        new ProductDTO(item.getProduct()),
                        item.getQuantity()))
                .collect(Collectors.toList());
        return new CartDTO(cart.getId(), items);
    }

    private OrderDTO convertToOrderDTO(Order order) {
        return getOrderDTO(order);
    }

    public OrderDTO getOrderDTO(Order order) {
        return convertToOrderDTO(order);
    }
}
