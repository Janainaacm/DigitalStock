package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.exception.WishlistItemNotFoundException;
import com.example.digitalstockbackend.model.CustomUser;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.model.Wishlist;
import com.example.digitalstockbackend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserService userService;
    private final ProductService productService;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository, UserService userService, ProductService productService) {
        this.wishlistRepository = wishlistRepository;
        this.userService = userService;
        this.productService = productService;
    }

    public ResponseEntity<List<Wishlist>> getUserWishlistById(Long userId) {
        List<Wishlist> userWishlist = wishlistRepository.findByUserId(userId);
        return ResponseEntity.ok(userWishlist);
    }

    public ResponseEntity<Wishlist> addProductToWishlist(Long userId, Long productId) {
        if (isProductInWishlist(userId, productId)) {
            return ResponseEntity.badRequest().body(null);
        }

        CustomUser user = userService.getUserById(userId);
        Product product = productService.getProductById(productId);
        Wishlist wishlistItem = new Wishlist();
        wishlistItem.setUser(user);
        wishlistItem.setProduct(product);
        wishlistRepository.save(wishlistItem);

        return ResponseEntity.ok(wishlistItem);
    }

    public ResponseEntity<Wishlist> deleteProductFromWishlist(Long userId, Long productId) {
        Wishlist wishlistItem = wishlistRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new WishlistItemNotFoundException("Wishlist item not found"));
        wishlistRepository.delete(wishlistItem);

        return ResponseEntity.ok(wishlistItem);
    }

    public ResponseEntity<List<Wishlist>> clearWishlist(Long userId) {
        List<Wishlist> userWishlist = wishlistRepository.findByUserId(userId);
        wishlistRepository.deleteAll(userWishlist);

        return ResponseEntity.ok(Collections.emptyList());
    }

    public boolean isProductInWishlist(Long userId, Long productId) {
        return wishlistRepository.findByUserIdAndProductId(userId, productId).isPresent();
    }
}

