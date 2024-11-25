package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.dto.CartDTO;
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
    public ResponseEntity<CartDTO> fetchCartByUserId(@PathVariable Long userId) {
        return cartService.fetchCartByUserId(userId);
    }

    @PutMapping("/{userId}/add/{productId}/{quantity}")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long userId, @PathVariable Long productId, @PathVariable int quantity) {
        return cartService.addProductToCart(productId, userId, quantity);
    }


    @DeleteMapping("/{userId}/{cartItemId}")
    public ResponseEntity<CartDTO> removeItemFromCart(@PathVariable Long userId, @PathVariable Long cartItemId) {
        return cartService.removeItemFromCart(cartItemId, userId);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<CartDTO> clearCart(@PathVariable Long userId) {
        return cartService.clearCart(userId);
    }

}
