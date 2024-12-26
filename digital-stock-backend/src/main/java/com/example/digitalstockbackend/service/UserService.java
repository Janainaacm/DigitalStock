package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.*;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Fetch User by ID
    public ResponseEntity<UserDTO> fetchUserById(Long id) {
        return userRepository.findById(id)
                .map(this::convertToUserDTO)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
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
