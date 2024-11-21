package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.model.CartItem;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.repository.CartItemRepository;
import com.example.digitalstockbackend.repository.CartRepository;
import com.example.digitalstockbackend.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserService userService;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, UserService userService, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.productRepository = productRepository;
    }

    public ResponseEntity<Cart> fetchCartByUserId(Long userId) {
        Cart cart = getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    public ResponseEntity<Cart> addProductToCart(Long productId, Long userId) {
        Cart cart = getCartByUserId(userId);

        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Optional<CartItem> existingCartItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + 1);
        } else {
            Product product = optionalProduct.get();
            CartItem newCartItem = new CartItem(cart, product, 1);
            cart.getItems().add(newCartItem);
        }

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