package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.exception.UserAlreadyExistsException;
import com.example.digitalstockbackend.exception.UserNotFoundException;
import com.example.digitalstockbackend.model.CustomUser;
import com.example.digitalstockbackend.model.Wishlist;
import com.example.digitalstockbackend.repository.UserRepository;
import com.example.digitalstockbackend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final WishlistRepository wishlistRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, WishlistRepository wishlistRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.wishlistRepository = wishlistRepository;
    }

    public List<CustomUser> getAllUsers() {
        return userRepository.findAll();
    }

    public CustomUser getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public CustomUser getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));
    }

    public CustomUser getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + email + " not found"));
    }

    public CustomUser createUser(CustomUser user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists.");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }


    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public CustomUser updateUserProfile(String username, CustomUser userDetails) {
        return userRepository.findByUsername(username)
                .map(user -> {
                    user.setEmail(userDetails.getEmail());
                    user.setUsername(userDetails.getUsername());
                    // Only update password if provided
                    if (userDetails.getPassword() != null) {
                        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
                    }
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }





}
