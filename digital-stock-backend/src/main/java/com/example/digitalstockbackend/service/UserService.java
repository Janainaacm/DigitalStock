package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.*;
import com.example.digitalstockbackend.exception.UserNotFoundException;
import com.example.digitalstockbackend.model.Address;
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

    public ResponseEntity<UserDTO> updateUserProfile(Long userId, UserDTO userDTO) {
        CustomUser updatedUser = userRepository.findById(userId)
                .map(user -> {
                    if (userDTO.getFirstName() != null && !userDTO.getFirstName().equals(user.getFirstName())) {
                        user.setFirstName(userDTO.getFirstName());
                    }
                    if (userDTO.getLastName() != null && !userDTO.getLastName().equals(user.getLastName())) {
                        user.setLastName(userDTO.getLastName());
                    }
                    if (userDTO.getEmail() != null && !userDTO.getEmail().equals(user.getEmail())) {
                        user.setEmail(userDTO.getEmail());
                    }
                    if (userDTO.getPhoneNo() != null && !userDTO.getPhoneNo().equals(user.getPhoneNo())) {
                        user.setPhoneNo(userDTO.getPhoneNo());
                    }

                    if (userDTO.getAddress() != null) {
                        Address address = user.getAddress();
                        if (address == null) {
                            address = new Address();
                            user.setAddress(address);
                        }
                        AddressDTO addressDTO = userDTO.getAddress();

                        if (addressDTO.getAddressLine() != null && !addressDTO.getAddressLine().equals(address.getAddressLine())) {
                            address.setAddressLine(addressDTO.getAddressLine());
                        }
                        if (addressDTO.getCity() != null && !addressDTO.getCity().equals(address.getCity())) {
                            address.setCity(addressDTO.getCity());
                        }
                        if (addressDTO.getState() != null && !addressDTO.getState().equals(address.getState())) {
                            address.setState(addressDTO.getState());
                        }
                        if (addressDTO.getZipCode() != null && !addressDTO.getZipCode().equals(address.getZipCode())) {
                            address.setZipCode(addressDTO.getZipCode());
                        }
                    }

                    return userRepository.save(user);
                })
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return ResponseEntity.ok(new UserDTO(updatedUser));
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
