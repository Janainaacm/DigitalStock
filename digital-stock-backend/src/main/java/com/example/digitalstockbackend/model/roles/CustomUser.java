package com.example.digitalstockbackend.model.roles;

import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.Wishlist;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class CustomUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 4, max = 32, message = "Username must be between 4-32 chars")
    private String username;

    @NotBlank
    @Size(min = 7, message = "Password must be at least 7 characters")
    private String password;

    private String userRole;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Wishlist> userWishlist;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> userOrders;

    @OneToOne
    private Cart cart;


    private boolean isAccountNonExpired = true;
    private boolean isAccountNonLocked = true;
    private boolean isCredentialsNonExpired = true;
    private boolean isEnabled = true;

    public CustomUser() {}

    public CustomUser(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.userRole = null;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank @Email String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank @Email String email) {
        this.email = email;
    }

    public @NotBlank @Size(min = 4, max = 32, message = "Username must be between 4-32 chars") String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank @Size(min = 4, max = 32, message = "Username must be between 4-32 chars") String username) {
        this.username = username;
    }

    public @NotBlank @Size(min = 7, message = "Password must be at least 7 characters") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank @Size(min = 7, message = "Password must be at least 7 characters") String password) {
        this.password = password;
    }

    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        isAccountNonExpired = accountNonExpired;
    }

    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        isCredentialsNonExpired = credentialsNonExpired;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public List<Wishlist> getUserWishlist() {
        return userWishlist;
    }

    public void setUserWishlist(List<Wishlist> userWishlist) {
        this.userWishlist = userWishlist;
    }

    public List<Order> getUserOrders() {
        return userOrders;
    }

    public void setUserOrders(List<Order> userOrders) {
        this.userOrders = userOrders;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}

