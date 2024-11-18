package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.model.CustomUser;
import com.example.digitalstockbackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }


    //Register
    @PostMapping("/register")
    public ResponseEntity<CustomUser> registerUser(@Valid @RequestBody CustomUser customUser, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }

        userService.registerUser(customUser);
        return ResponseEntity.ok(customUser);
    }

    //Login
    @GetMapping("/login")
    public String loginPage() {

        return "login";
    }


    //Logout
    @GetMapping("/logout")
    public String logoutPage() {

        return "logout";
    }







}
