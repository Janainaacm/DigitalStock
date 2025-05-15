package com.example.digitalstockbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class WishlistDTO {
    private Long id;
    private List<WishlistItemDTO> items;
}
