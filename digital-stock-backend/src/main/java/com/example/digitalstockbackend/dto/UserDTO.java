package com.example.digitalstockbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String role;
    private AddressDTO address;
    private WishlistDTO wishlist;
    private CartDTO cart;
    private List<OrderDTO> orders;
    private String firstName;
    private String lastName;
    private String phoneNo;
}
