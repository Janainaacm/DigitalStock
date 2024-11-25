package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.WishlistDTO;
import com.example.digitalstockbackend.dto.WishlistItemDTO;
import com.example.digitalstockbackend.exception.WishlistItemNotFoundException;
import com.example.digitalstockbackend.model.*;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.repository.ProductRepository;
import com.example.digitalstockbackend.repository.WishlistItemRepository;
import com.example.digitalstockbackend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserService userService;
    private final ProductRepository productRepository;
    private final WishlistItemRepository wishlistItemRepository;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository, UserService userService, ProductRepository productRepository, WishlistItemRepository wishlistItemRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userService = userService;
        this.productRepository = productRepository;
        this.wishlistItemRepository = wishlistItemRepository;
    }

    // Fetch Wishlist by User ID
    public ResponseEntity<WishlistDTO> fetchWishlistByUserId(Long userId) {
        Wishlist wishlist = findOrCreateWishlistByUserId(userId);
        WishlistDTO wishlistDTO = convertToWishlistDTO(wishlist);
        return ResponseEntity.ok(wishlistDTO);
    }

    // Add Product to Wishlist
    public ResponseEntity<WishlistDTO> addProductToWishlist(Long userId, Long productId) {
        Wishlist wishlist = findOrCreateWishlistByUserId(userId);

        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Product product = optionalProduct.get();
        WishlistItem newWishlistItem = new WishlistItem(wishlist, product);
        wishlist.getItems().add(newWishlistItem);

        Wishlist updatedWishlist = wishlistRepository.save(wishlist);
        WishlistDTO wishlistDTO = convertToWishlistDTO(updatedWishlist);
        return ResponseEntity.ok(wishlistDTO);
    }

    // Remove Item from Wishlist
    public ResponseEntity<WishlistDTO> removeItemFromWishlist(Long userId, Long wishlistItemId) {
        Wishlist wishlist = findOrCreateWishlistByUserId(userId);

        Optional<WishlistItem> optionalWishlistItem = wishlistItemRepository.findById(wishlistItemId);
        if (optionalWishlistItem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        boolean removed = wishlist.getItems().removeIf(item -> item.getId().equals(optionalWishlistItem.get().getId()));
        if (!removed) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Wishlist updatedWishlist = wishlistRepository.save(wishlist);
        WishlistDTO wishlistDTO = convertToWishlistDTO(updatedWishlist);
        return ResponseEntity.ok(wishlistDTO);
    }

    // Clear Wishlist
    public ResponseEntity<WishlistDTO> clearWishlist(Long userId) {
        Wishlist wishlist = findOrCreateWishlistByUserId(userId);
        wishlist.getItems().clear();
        Wishlist updatedWishlist = wishlistRepository.save(wishlist);
        WishlistDTO wishlistDTO = convertToWishlistDTO(updatedWishlist);
        return ResponseEntity.ok(wishlistDTO);
    }

    // Helper: Find or Create Wishlist by User ID
    private Wishlist findOrCreateWishlistByUserId(Long userId) {
        CustomUser user = userService.getUserById(userId);
        return wishlistRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Wishlist newWishlist = new Wishlist();
                    newWishlist.setUser(user);
                    return wishlistRepository.save(newWishlist);
                });
    }

    // Helper: Convert Wishlist to WishlistDTO
    private WishlistDTO convertToWishlistDTO(Wishlist wishlist) {
        List<WishlistItemDTO> itemDTOs = wishlist.getItems().stream()
                .map(item -> new WishlistItemDTO(item.getId(), item.getProduct().getId(), item.getProduct().getName()))
                .collect(Collectors.toList());
        return new WishlistDTO(wishlist.getId(), itemDTOs);
    }
}

