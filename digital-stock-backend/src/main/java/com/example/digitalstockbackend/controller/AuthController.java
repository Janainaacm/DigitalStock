package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.service.AuthService;
import com.example.digitalstockbackend.dto.LoginRequest;
import com.example.digitalstockbackend.dto.SignupRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
       return authService.authenticateUser(loginRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        return authService.registerUser(signUpRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
       return authService.logoutUser();
    }

    @GetMapping("/fetchUser")
    public ResponseEntity<?> fetchUser(@CookieValue(value = "authToken", required = false) String token) {
        return authService.fetchUser(token);
    }
}
