package com.example.digitalstockbackend.controller;


import com.example.digitalstockbackend.dto.ProductDTO;
import com.example.digitalstockbackend.dto.WishlistDTO;
import com.example.digitalstockbackend.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/wishlist")
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
    public ResponseEntity<WishlistDTO> addOrRemoveFromWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        return wishlistService.addProductToWishlist(userId, productId);
    }

    @DeleteMapping("/{userId}/{productId}/delete")
    public ResponseEntity<WishlistDTO> removeFromWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        return wishlistService.removeItemFromWishlist(userId, productId);
    }

    @DeleteMapping("/user/{userId}/clear")
    public ResponseEntity<WishlistDTO> clearWishlist(@PathVariable Long userId) {
        return wishlistService.clearWishlist(userId);
    }

    @GetMapping("/{userId}/product/{productId}/exists")
    public ResponseEntity<Boolean> isProductInWishlist(
            @PathVariable Long userId,
            @PathVariable Long productId) {
        return wishlistService.isProductInWishlist(userId, productId);
    }


    @GetMapping("/user/{userId}/wishlist/{wishlistId}")
    public ResponseEntity<List<ProductDTO>> getWishlistProducts(@PathVariable Long userId, @PathVariable Long wishlistId) {
        return wishlistService.fetchProductsInWishlist(userId, wishlistId);
    }
}
