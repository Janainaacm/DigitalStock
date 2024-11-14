package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.model.CustomUser;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.model.Wishlist;
import com.example.digitalstockbackend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserService userService;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository, UserService userService) {
        this.wishlistRepository = wishlistRepository;
        this.userService = userService;
    }

    public List<Wishlist> getUserWishlistById(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

    public Wishlist addProductToWishlist(Long userId, Product product) {
        CustomUser user = userService.getUserById(userId);
        Wishlist wishlistItem = new Wishlist();
        wishlistItem.setUser(user);
        wishlistItem.setProduct(product);
        return wishlistRepository.save(wishlistItem);
    }

    public void deleteProductFromWishlist(Long userId, Long productId) {
        Wishlist wishlistItem = wishlistRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new RuntimeException("Wishlist item not found"));
        wishlistRepository.delete(wishlistItem);
    }

    public void clearWishlist(Long userId) {
        List<Wishlist> userWishlist = wishlistRepository.findByUserId(userId);
        wishlistRepository.deleteAll(userWishlist);
    }
}
