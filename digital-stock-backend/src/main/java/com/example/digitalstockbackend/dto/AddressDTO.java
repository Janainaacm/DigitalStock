package com.example.digitalstockbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AddressDTO {
    private String addressLine;
    private String city;
    private String state;
    private String zipCode;
}
