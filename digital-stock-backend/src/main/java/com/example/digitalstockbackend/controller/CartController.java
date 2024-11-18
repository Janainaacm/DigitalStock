package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> fetchCartByUserId(@PathVariable Long userId) {
        return cartService.fetchCartByUserId(userId);
    }

    @PutMapping("/{userId}/{cartItemId}")
    public ResponseEntity<Cart> addItemToCart(@PathVariable Long userId, @PathVariable Long cartItemId) {
        return cartService.addItemToCart(cartItemId, userId);
    }

    @DeleteMapping("/{userId}/{cartItemId}")
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable Long userId, @PathVariable Long cartItemId) {
        return cartService.removeItemFromCart(cartItemId, userId);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Cart> clearCart(@PathVariable Long userId) {
        return cartService.clearCart(userId);
    }

}
