package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.ProductDTO;
import com.example.digitalstockbackend.dto.WishlistDTO;
import com.example.digitalstockbackend.dto.WishlistItemDTO;
import com.example.digitalstockbackend.exception.WishlistItemNotFoundException;
import com.example.digitalstockbackend.model.*;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.repository.ProductRepository;
import com.example.digitalstockbackend.repository.WishlistItemRepository;
import com.example.digitalstockbackend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserService userService;
    private final ProductRepository productRepository;
    private final WishlistItemRepository wishlistItemRepository;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository, UserService userService, ProductRepository productRepository, WishlistItemRepository wishlistItemRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userService = userService;
        this.productRepository = productRepository;
        this.wishlistItemRepository = wishlistItemRepository;
    }

    public ResponseEntity<WishlistDTO> fetchWishlistByUserId(Long userId) {
        Wishlist wishlist = findOrCreateWishlistByUserId(userId);
        WishlistDTO wishlistDTO = convertToWishlistDTO(wishlist);
        return ResponseEntity.ok(wishlistDTO);
    }

    public ResponseEntity<WishlistDTO> addProductToWishlist(Long userId, Long productId) {
        Wishlist wishlist = findOrCreateWishlistByUserId(userId);

        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Product product = optionalProduct.get();
        WishlistItem newWishlistItem = new WishlistItem(wishlist, product);
        wishlist.getItems().add(newWishlistItem);

        Wishlist updatedWishlist = wishlistRepository.save(wishlist);
        WishlistDTO wishlistDTO = convertToWishlistDTO(updatedWishlist);
        return ResponseEntity.ok(wishlistDTO);
    }

    public ResponseEntity<WishlistDTO> removeItemFromWishlist(Long userId, Long productId) {
        Wishlist wishlist = findOrCreateWishlistByUserId(userId);

        System.out.println("Before remove: " + wishlist.getItems());
        boolean removed = wishlist.getItems().removeIf(item ->
                item.getProduct().getId().equals(productId)
        );
        System.out.println("After remove: " + wishlist.getItems());

        if (!removed) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Wishlist updatedWishlist = wishlistRepository.save(wishlist);
        System.out.println("Saved Wishlist: " + updatedWishlist.getItems());


        WishlistDTO wishlistDTO = convertToWishlistDTO(updatedWishlist);
        System.out.println("Returning WishlistDTO: " + wishlistDTO.getItems());
        return ResponseEntity.ok(wishlistDTO);

    }

    public ResponseEntity<WishlistDTO> clearWishlist(Long userId) {
        Wishlist wishlist = findOrCreateWishlistByUserId(userId);
        wishlist.getItems().clear();
        Wishlist updatedWishlist = wishlistRepository.save(wishlist);
        WishlistDTO wishlistDTO = convertToWishlistDTO(updatedWishlist);
        return ResponseEntity.ok(wishlistDTO);
    }

    public ResponseEntity<Boolean> isProductInWishlist(Long userId, Long productId) {
        Wishlist wishlist = findOrCreateWishlistByUserId(userId);

        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Product product = optionalProduct.get();

        boolean isInWishlist = wishlist.getItems().stream()
                .anyMatch(item -> item.getProduct().getId().equals(product.getId()));

        return ResponseEntity.ok(isInWishlist);
    }

    public ResponseEntity<List<ProductDTO>> fetchProductsInWishlist(Long userId, Long wishlistId) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Wishlist not found"));

        List<ProductDTO> productDTOList = wishlist.getItems().stream()
                .map(WishlistItem::getProduct)
                .map(product -> productRepository.findById(product.getId()))
                .flatMap(Optional::stream)
                .map(ProductDTO::new)
                .toList();

        return ResponseEntity.ok(productDTOList);
    }



    // Helper: Find or Create Wishlist by User ID
    private Wishlist findOrCreateWishlistByUserId(Long userId) {
        CustomUser user = userService.getUserById(userId);
        return wishlistRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Wishlist newWishlist = new Wishlist();
                    newWishlist.setUser(user);
                    return wishlistRepository.save(newWishlist);
                });
    }

    // Helper: Convert Wishlist to WishlistDTO
    private WishlistDTO convertToWishlistDTO(Wishlist wishlist) {
        List<WishlistItemDTO> itemDTOs = wishlist.getItems().stream()
                .map(item -> new WishlistItemDTO(item.getId(),
                        new ProductDTO(item.getProduct())
                ))
                .collect(Collectors.toList());
        return new WishlistDTO(wishlist.getId(), itemDTOs);
    }
}

