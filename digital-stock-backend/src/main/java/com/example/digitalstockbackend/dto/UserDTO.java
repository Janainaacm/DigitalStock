package com.example.digitalstockbackend.dto;

import java.util.List;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String role;
    private WishlistDTO wishlist;
    private CartDTO cart;
    private List<OrderDTO> orders;

    public UserDTO(Long id, String username, String email, String role, WishlistDTO wishlist, CartDTO cart, List<OrderDTO> orders) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.wishlist = wishlist;
        this.cart = cart;
        this.orders = orders;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public WishlistDTO getWishlist() {
        return wishlist;
    }

    public void setWishlist(WishlistDTO wishlist) {
        this.wishlist = wishlist;
    }

    public CartDTO getCart() {
        return cart;
    }

    public void setCart(CartDTO cart) {
        this.cart = cart;
    }

    public List<OrderDTO> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderDTO> orders) {
        this.orders = orders;
    }
}
