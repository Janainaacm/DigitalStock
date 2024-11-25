package com.example.digitalstockbackend.dto;

public class WishlistItemDTO {
    private Long id;
    private Long productId;
    private String productName;

    public WishlistItemDTO(Long id, Long productId, String productName) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
