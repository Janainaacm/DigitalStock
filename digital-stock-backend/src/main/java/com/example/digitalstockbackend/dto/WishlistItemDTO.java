package com.example.digitalstockbackend.dto;

import com.example.digitalstockbackend.model.WishlistItem;

public class WishlistItemDTO {
    private Long id;
    private ProductDTO product;

    public WishlistItemDTO(WishlistItem wishlistItem) {
        this.id = wishlistItem.getId();
        this.product = new ProductDTO(wishlistItem.getProduct());
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
