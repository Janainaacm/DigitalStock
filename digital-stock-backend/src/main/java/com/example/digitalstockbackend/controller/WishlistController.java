package com.example.digitalstockbackend.controller;


import com.example.digitalstockbackend.dto.WishlistDTO;
import com.example.digitalstockbackend.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<WishlistDTO> getWishlist(@PathVariable Long userId) {
        return wishlistService.fetchWishlistByUserId(userId);
    }

    @PostMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<WishlistDTO> addToWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        return wishlistService.addProductToWishlist(userId, productId);
    }

    @DeleteMapping("/{userId}/{wishlistItemId}")
    public ResponseEntity<WishlistDTO> removeFromWishlist(@PathVariable Long userId, @PathVariable Long wishlistItemId) {
        return wishlistService.removeItemFromWishlist(userId, wishlistItemId);
    }

    @DeleteMapping("/user/{userId}/clear")
    public ResponseEntity<WishlistDTO> clearWishlist(@PathVariable Long userId) {
        return wishlistService.clearWishlist(userId);
    }
}
