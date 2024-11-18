package com.example.digitalstockbackend.controller;


import com.example.digitalstockbackend.model.Wishlist;
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
    public ResponseEntity<List<Wishlist>> getWishlist(@PathVariable Long userId) {
        return wishlistService.getUserWishlistById(userId);
    }

    @PostMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<Wishlist> addToWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        return wishlistService.addProductToWishlist(userId, productId);
    }

    @DeleteMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<Wishlist> removeFromWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        return wishlistService.deleteProductFromWishlist(userId, productId);
    }

    @DeleteMapping("/user/{userId}/clear")
    public ResponseEntity<List<Wishlist>> clearWishlist(@PathVariable Long userId) {
        return wishlistService.clearWishlist(userId);
    }
}
