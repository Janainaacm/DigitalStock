package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.dto.PasswordDTO;
import com.example.digitalstockbackend.dto.UserDTO;
import com.example.digitalstockbackend.service.AuthService;
import com.example.digitalstockbackend.dto.LoginRequest;
import com.example.digitalstockbackend.dto.SignupRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
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

    @PutMapping("/verifyPassword")
    public ResponseEntity<Boolean> verifyPasswordIsCorrect(@RequestBody PasswordDTO passwordDTO) {
        return authService.verifyPassword(passwordDTO);
    }

    @DeleteMapping("/delete/user/{userId}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long userId) {
        return authService.deleteUserById(userId);
    }

    @GetMapping("/role")
    public ResponseEntity<List<String>> getUserRoleByToken(HttpServletRequest request) {
        return authService.getUserRoleByToken(request);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<UserDTO> updateUserProfile(@RequestBody UserDTO userDetails, @PathVariable Long userId) {
        return authService.updateUserProfile(userId, userDetails);
    }

}
