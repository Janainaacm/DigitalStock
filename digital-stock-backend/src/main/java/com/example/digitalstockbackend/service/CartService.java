package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.model.CartItem;
import com.example.digitalstockbackend.model.CustomUser;
import com.example.digitalstockbackend.repository.CartItemRepository;
import com.example.digitalstockbackend.repository.CartRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserService userService;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, UserService userService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
    }

    public ResponseEntity<Cart> fetchCartByUserId(Long userId) {
        Cart cart = getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    public ResponseEntity<Cart> addItemToCart(Long cartItemId, Long userId) {
        Cart cart = getCartByUserId(userId);
        Optional<CartItem> optionalCartItem = cartItemRepository.findById(cartItemId);

        if (optionalCartItem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        cart.getItems().add(optionalCartItem.get());
        Cart updatedCart = cartRepository.save(cart);
        return ResponseEntity.ok(updatedCart);
    }

    public ResponseEntity<Cart> removeItemFromCart(Long cartItemId, Long userId) {
        Cart cart = getCartByUserId(userId);
        Optional<CartItem> optionalCartItem = cartItemRepository.findById(cartItemId);

        if (optionalCartItem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        boolean removed = cart.getItems().removeIf(item -> item.getId().equals(optionalCartItem.get().getId()));

        if (!removed) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(cart);
        }

        Cart updatedCart = cartRepository.save(cart);
        return ResponseEntity.ok(updatedCart);
    }

    public ResponseEntity<Cart> clearCart(Long userId) {
        Cart cart = getCartByUserId(userId);
        cart.getItems().clear();
        Cart updatedCart = cartRepository.save(cart);
        return ResponseEntity.ok(updatedCart);
    }

    private Cart getCartByUserId(Long userId) {
        CustomUser user = userService.getUserById(userId);
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
    }
}