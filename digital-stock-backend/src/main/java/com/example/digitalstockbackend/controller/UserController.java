package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.config.security.CustomUserDetailsService;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.CustomUser;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.model.Wishlist;
import com.example.digitalstockbackend.service.OrderService;
import com.example.digitalstockbackend.service.UserService;
import com.example.digitalstockbackend.service.WishlistService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final OrderService orderService;
    private final WishlistService wishlistService;
    private final CustomUserDetailsService customUserDetailsService;

    @Autowired
    public UserController(UserService userService, OrderService orderService, WishlistService wishlistService, CustomUserDetailsService customUserDetailsService) {
        this.userService = userService;
        this.orderService = orderService;
        this.wishlistService = wishlistService;
        this.customUserDetailsService = customUserDetailsService;
    }

    //Register
    @PostMapping("/register")
    public ResponseEntity<CustomUser> register(@Valid @RequestBody CustomUser customUser, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }

        userService.createUser(customUser);
        return ResponseEntity.ok(customUser);
    }



    @GetMapping("/profile")
    public CustomUser getUserProfile(Principal principal) {
        String username = principal.getName();
        return userService.getUserByUsername(username);
    }

    @PutMapping("/profile")
    public CustomUser updateUserProfile(@RequestBody CustomUser userDetails, Principal principal) {
        String username = principal.getName();
        return userService.updateUserProfile(username, userDetails);
    }


    @GetMapping("/orders")
    public List<Order> getUserOrders(Principal principal) {
        String username = principal.getName();
        return orderService.getOrdersByUser(username);
    }


}

