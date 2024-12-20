package com.example.digitalstockbackend.dto;

import com.example.digitalstockbackend.model.Wishlist;

import java.util.List;

public class WishlistDTO {
    private Long id;
    private List<WishlistItemDTO> items;

    public WishlistDTO() {
    }

    public WishlistDTO(Wishlist wishlist) {
        this.id = wishlist.getId();
        this.items = wishlist.getItems().stream().map(WishlistItemDTO::new).toList();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<WishlistItemDTO> getItems() {
        return items;
    }

    public void setItems(List<WishlistItemDTO> items) {
        this.items = items;
    }
}
