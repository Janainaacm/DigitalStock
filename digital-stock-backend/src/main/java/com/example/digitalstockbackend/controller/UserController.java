package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.model.CustomUser;
import com.example.digitalstockbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/{userId}")
    public ResponseEntity<CustomUser> fetchUserById(@PathVariable Long userId) {
        return userService.fetchUserById(userId);
    }


    @PutMapping("/{userId}")
    public ResponseEntity<CustomUser> updateUserProfile(@RequestBody CustomUser userDetails, @PathVariable Long userId) {
        return userService.updateUserProfile(userId, userDetails);
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        return userService.deleteUser(userId);
    }



}