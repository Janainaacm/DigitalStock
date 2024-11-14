package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.model.CustomUser;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.model.Wishlist;
import com.example.digitalstockbackend.service.ProductService;
import com.example.digitalstockbackend.service.UserService;
import com.example.digitalstockbackend.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;
    private final UserService userService;
    private final ProductService productService;

    @Autowired
    public WishlistController(WishlistService wishlistService, UserService userService, ProductService productService) {
        this.wishlistService = wishlistService;
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping
    public List<Wishlist> getWishlist(Principal principal) {
        String username = principal.getName();
        CustomUser user = userService.getUserByUsername(username);
        return wishlistService.getUserWishlistById(user.getId());
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Wishlist> addProductToWishlist(@PathVariable Long productId, Principal principal) {
        String username = principal.getName();
        CustomUser user = userService.getUserByUsername(username);
        Product product = productService.getProductById(productId);
        Wishlist wishlistItem = wishlistService.addProductToWishlist(user.getId(), product);
        return ResponseEntity.ok(wishlistItem);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeProductFromWishlist(@PathVariable Long productId, Principal principal) {
        String username = principal.getName();
        CustomUser user = userService.getUserByUsername(username);
        wishlistService.deleteProductFromWishlist(user.getId(), productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearWishlist(Principal principal) {
        String username = principal.getName();
        CustomUser user = userService.getUserByUsername(username);
        wishlistService.clearWishlist(user.getId());
        return ResponseEntity.noContent().build();
    }
}

