package com.example.digitalstockbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private String colorName;
    private String image;
    private int stock;
    private BigDecimal price;
    private String categoryName;
    private int sales;
}
