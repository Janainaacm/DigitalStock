package com.example.digitalstockbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private String status;
    private LocalDateTime orderDate;

    // Personal details
    private String firstName;
    private String lastName;
    private String phoneNo;
    private String email;

    // Shipping details
    private AddressDTO address;
    private Long subtotal;

    private List<OrderItemDTO> orderItems;
}
