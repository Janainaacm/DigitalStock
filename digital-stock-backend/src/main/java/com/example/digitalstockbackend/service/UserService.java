package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.*;
import com.example.digitalstockbackend.exception.UserNotFoundException;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Fetch User by ID
    public ResponseEntity<UserDTO> fetchUserById(Long id) {
        return userRepository.findById(id)
                .map(this::convertToUserDTO)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public ResponseEntity<UserDTO> updateUserProfile(Long userId, CustomUser userDetails) {
        CustomUser updatedUser = userRepository.findById(userId)
                .map(user -> {
                    user.setEmail(userDetails.getEmail());
                    user.setUsername(userDetails.getUsername());
                    if (userDetails.getPassword() != null) {
                        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
                    }
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return ResponseEntity.ok(convertToUserDTO(updatedUser));
    }

    public ResponseEntity<Void> deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    public CustomUser getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));
    }

    public CustomUser getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email " + email + " not found"));
    }

    public CustomUser getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private UserDTO convertToUserDTO(CustomUser user) {
        return new UserDTO(user);
    }


    private OrderDTO convertToOrderDTO(Order order) {
        return getOrderDTO(order);
    }

    public OrderDTO getOrderDTO(Order order) {
        return convertToOrderDTO(order);
    }
}
