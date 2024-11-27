package com.example.digitalstockbackend.dto;

public class WishlistItemDTO {
    private Long id;
    private ProductDTO product;

    public WishlistItemDTO(Long id, ProductDTO product) {
        this.id = id;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }
}
