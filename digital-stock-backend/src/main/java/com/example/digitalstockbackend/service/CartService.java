package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.CartDTO;
import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.model.CartItem;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.repository.CartItemRepository;
import com.example.digitalstockbackend.repository.CartRepository;
import com.example.digitalstockbackend.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    // Fetch Cart by User ID
    public ResponseEntity<CartDTO> fetchCartByUserId(Long userId) {
        Cart cart = findOrCreateCartByUserId(userId);
        List<CartItem> sortedItems = cart.getItems().stream()
                .sorted(Comparator.comparing(CartItem::getAddedAt))
                .collect(Collectors.toList());
        cart.setItems(sortedItems);
        CartDTO cartDTO = convertToCartDTO(cart);
        return ResponseEntity.ok(cartDTO);
    }

    // Add Product to Cart
    public ResponseEntity<CartDTO> addProductToCart(Long productId, Long userId, int quantity) {
        Cart cart = findOrCreateCartByUserId(userId);

        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Optional<CartItem> existingCartItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            Product product = optionalProduct.get();
            CartItem newCartItem = new CartItem(cart, product, quantity);
            cart.getItems().add(newCartItem);
        }

        Cart updatedCart = cartRepository.save(cart);
        CartDTO cartDTO = convertToCartDTO(updatedCart);
        return ResponseEntity.ok(cartDTO);
    }

    // Remove Item from Cart
    public ResponseEntity<CartDTO> removeItemFromCart(Long productId, Long userId, int quantity) {
        Cart cart = findOrCreateCartByUserId(userId);

        Optional<CartItem> optionalItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (optionalItem.isPresent()) {
            CartItem item = optionalItem.get();

            int originalQuantity = item.getQuantity();

            if (originalQuantity > quantity) {
                item.setQuantity(originalQuantity - quantity);
            } else {
                cart.getItems().remove(item);
                cartItemRepository.delete(item);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Cart updatedCart = cartRepository.save(cart);

        CartDTO cartDTO = convertToCartDTO(updatedCart);
        return ResponseEntity.ok(cartDTO);
    }




    // Clear Cart
    public ResponseEntity<CartDTO> clearCart(Long userId) {
        Cart cart = findOrCreateCartByUserId(userId);
        cart.getItems().clear();
        Cart updatedCart = cartRepository.save(cart);
        CartDTO cartDTO = convertToCartDTO(updatedCart);
        return ResponseEntity.ok(cartDTO);
    }

    // Helper: Convert Cart to CartDTO
    private CartDTO convertToCartDTO(Cart cart) {
        return new CartDTO(cart);
    }

    public Cart findOrCreateCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(userService.getUserById(userId));
                    newCart.setItems(new ArrayList<>());
                    return cartRepository.save(newCart);
                });
    }

}
