package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.config.security.CustomUserDetails;
import com.example.digitalstockbackend.config.security.jwt.JwtUtils;
import com.example.digitalstockbackend.dto.*;
import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.model.Wishlist;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.model.roles.ERole;
import com.example.digitalstockbackend.model.roles.Role;
import com.example.digitalstockbackend.model.Order;

import com.example.digitalstockbackend.repository.RoleRepository;
import com.example.digitalstockbackend.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final UserService userService;


    @Autowired
    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        List<String> role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        ResponseCookie cookie = ResponseCookie.from("authToken", jwt)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .sameSite("Strict")
                .build();

        JwtResponse jwtResponse = new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                role
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(jwtResponse);
    }

    public ResponseEntity<Boolean> deleteUserById(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User with ID " + userId + " does not exist.");
        }

        try {
            userRepository.deleteById(userId);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user with ID " + userId + ": " + e.getMessage(), e);
        }
    }



    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        CustomUser user = new CustomUser(
                signUpRequest.getEmail(),
                signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword())
        );

        ERole roleEnum = ERole.ROLE_USER;
        if ("ROLE_ADMIN".equals(signUpRequest.getRole())) {
            roleEnum = ERole.ROLE_ADMIN;
        }

        Role role = roleRepository.findByName(roleEnum)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        user.setRole(role);

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }



    public ResponseEntity<List<String>> getUserRoleByToken(HttpServletRequest request) {
        String token = extractTokenFromCookie(request);

        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        List<String> roles = jwtUtils.getRolesFromJwtToken(token);

        if (roles.isEmpty()) {
            return ResponseEntity.badRequest().body(roles);
        }
        return ResponseEntity.ok(roles);
    }

    private String extractTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("authToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }




    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = ResponseCookie.from("authToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("Logged out successfully"));
    }


    public ResponseEntity<?> fetchUser(@CookieValue(value = "authToken", required = false) String token) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        try {
            String username = jwtUtils.getUserNameFromJwtToken(token);
            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            CustomUser userDetails = userService.getUserByUsername(username);
            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }

            UserDTO userDTO = convertToUserDTO(userDetails);

            return ResponseEntity.ok(userDTO);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Error validating token or fetching user details");
        }
    }


    public ResponseEntity<Boolean> verifyPassword(PasswordDTO passwordDTO) {
        CustomUser user = userService.getUserById(passwordDTO.getUserId());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }

        boolean isPasswordValid = encoder.matches(passwordDTO.getPassword(), user.getPassword());
        return isPasswordValid ? ResponseEntity.ok(true) : ResponseEntity.badRequest().body(false);
    }




    private UserDTO convertToUserDTO(CustomUser user) {
        return new UserDTO(user);
    }

    private WishlistDTO convertToWishlistDTO(Wishlist wishlist) {
        return new WishlistDTO(wishlist);
    }

    private CartDTO convertToCartDTO(Cart cart) {
        return new CartDTO(cart);
    }

    private OrderDTO convertToOrderDTO(Order order) {
        return getOrderDTO(order);
    }

    private OrderDTO getOrderDTO(Order order) {
        return new OrderDTO(order);
    }



}
