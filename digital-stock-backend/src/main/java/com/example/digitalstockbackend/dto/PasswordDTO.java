package com.example.digitalstockbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PasswordDTO {
    private String password;
    private Long userId;
}
