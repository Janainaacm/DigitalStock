package com.example.digitalstockbackend.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.digitalstockbackend.config.security.CustomUserDetails;
import com.example.digitalstockbackend.dto.JwtResponse;
import com.example.digitalstockbackend.dto.LoginRequest;
import com.example.digitalstockbackend.dto.MessageResponse;
import com.example.digitalstockbackend.dto.SignupRequest;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.model.roles.ERole;
import com.example.digitalstockbackend.model.roles.Role;
import com.example.digitalstockbackend.repository.RoleRepository;
import com.example.digitalstockbackend.repository.UserRepository;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.digitalstockbackend.config.security.jwt.JwtUtils;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(),
                        roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        System.out.println("Email: " + signUpRequest.getEmail());
        System.out.println("Username: " + signUpRequest.getUsername());

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        CustomUser user = new CustomUser(signUpRequest.getEmail(), signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()));
        System.out.println("Email: " + user.getEmail());
        System.out.println("Password: " +user.getPassword());
        System.out.println("Username: " +user.getUsername());
        System.out.println("Roles: " +signUpRequest.getRole());

        String role= null;
        if (signUpRequest.getRole() == null) {
            System.out.println("inside if strRoles is null");

            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            role = ERole.ROLE_USER.name();
            System.out.println("After add userRole: " + userRole);
        } else {
            System.out.println("inside else statement");

                switch (signUpRequest.getRole()) {
                    case "ROLE_ADMIN":
                        System.out.println("case admin");
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        role= ERole.ROLE_ADMIN.name();

                        break;
                    case "ROLE_GUEST":
                        System.out.println("case guest");
                        Role guestRole = roleRepository.findByName(ERole.ROLE_GUEST)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        role= ERole.ROLE_GUEST.name();

                        break;
                    default:
                        System.out.println("case default");
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        role= ERole.ROLE_USER.name();
                        System.out.println("if role is found. userRole: " + userRole);

                        System.out.println("After add userRole: " + userRole + " to roles: " + role);
                }

        }

        user.setUserRole(role);
        System.out.println("Signup Request: " + signUpRequest);
        System.out.println("Role from user: " + user.getUserRole());
        System.out.println("Role: " + role);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}