package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.ProductDTO;
import com.example.digitalstockbackend.dto.WishlistDTO;
import com.example.digitalstockbackend.model.*;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.repository.ProductRepository;
import com.example.digitalstockbackend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserService userService;
    private final ProductRepository productRepository;
    private final DTOConverter dto;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository, UserService userService, ProductRepository productRepository, DTOConverter dto) {
        this.wishlistRepository = wishlistRepository;
        this.userService = userService;
        this.productRepository = productRepository;
        this.dto = dto;
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
        WishlistItem newWishlistItem = WishlistItem.builder().wishlist(wishlist).product(product).build();
        wishlist.getItems().add(newWishlistItem);

        Wishlist updatedWishlist = wishlistRepository.save(wishlist);
        WishlistDTO wishlistDTO = convertToWishlistDTO(updatedWishlist);
        return ResponseEntity.ok(wishlistDTO);
    }

    public ResponseEntity<WishlistDTO> removeItemFromWishlist(Long userId, Long productId) {
        Wishlist wishlist = findOrCreateWishlistByUserId(userId);

        boolean removed = wishlist.getItems().removeIf(item ->
                item.getProduct().getId().equals(productId)
        );

        if (!removed) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Wishlist updatedWishlist = wishlistRepository.save(wishlist);


        WishlistDTO wishlistDTO = convertToWishlistDTO(updatedWishlist);
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
                .map(dto::convertToProductDTO)
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
        return dto.convertToWishlistDTO(wishlist);
    }
}

