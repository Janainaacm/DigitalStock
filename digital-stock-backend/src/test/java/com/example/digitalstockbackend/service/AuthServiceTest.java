package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.MessageResponse;
import com.example.digitalstockbackend.dto.SignupRequest;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.model.roles.ERole;
import com.example.digitalstockbackend.model.roles.Role;
import com.example.digitalstockbackend.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder encoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void testRegisterUser_Success() {
        SignupRequest request = new SignupRequest();
        request.setUsername("testuser");
        request.setEmail("testuser@mail.com");
        request.setPassword("password");

        Role role = new Role();
        role.setName(ERole.ROLE_USER);

        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("testuser@mail.com")).thenReturn(false);
        when(roleRepository.findByName(ERole.ROLE_USER)).thenReturn(Optional.of(role));
        when(userRepository.save(any(CustomUser.class))).thenReturn(new CustomUser());

        ResponseEntity<?> response = authService.registerUser(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof MessageResponse);
        assertEquals("User registered successfully!", ((MessageResponse) response.getBody()).getMessage());
    }

    @Test
    void testRegisterUser_UsernameAlreadyExists() {
        SignupRequest request = new SignupRequest();
        request.setUsername("testuser");

        when(userRepository.existsByUsername("testuser")).thenReturn(true);

        ResponseEntity<?> response = authService.registerUser(request);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertTrue(response.getBody() instanceof MessageResponse);
        assertEquals("Error: Username is already taken!", ((MessageResponse) response.getBody()).getMessage());
    }


}
