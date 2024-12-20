package com.example.digitalstockbackend.dto;

import com.example.digitalstockbackend.model.roles.CustomUser;

import java.util.List;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String role;
    private AddressDTO address;
    private WishlistDTO wishlist;
    private CartDTO cart;
    private List<OrderDTO> orders;
    private String firstName;
    private String lastName;
    private String phoneNo;

    public UserDTO() {
    }

    public UserDTO(CustomUser user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole().getName().name();
        this.address = user.getAddress() != null ? new AddressDTO(user.getAddress()) : null;
        this.wishlist = user.getWishlist() != null ? new WishlistDTO(user.getWishlist()) : null;
        this.cart = user.getCart() != null ? new CartDTO(user.getCart()) : null;
        this.orders = user.getUserOrders().stream().map(OrderDTO::new).toList();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.phoneNo = user.getPhoneNo();
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
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

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
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
