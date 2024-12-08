package com.example.digitalstockbackend.dto;

import com.example.digitalstockbackend.model.roles.CustomUser;

import java.util.List;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String role;
    private WishlistDTO wishlist;
    private CartDTO cart;
    private List<OrderDTO> orders;

    public UserDTO(CustomUser user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole().getName().name();
        this.wishlist = user.getWishlist() != null ? new WishlistDTO(user.getWishlist()) : null;
        this.cart = user.getCart() != null ? new CartDTO(user.getCart()) : null;
        this.orders = user.getUserOrders().stream().map(OrderDTO::new).toList();
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
