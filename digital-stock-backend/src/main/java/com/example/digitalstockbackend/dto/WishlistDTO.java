package com.example.digitalstockbackend.dto;

import java.util.List;

public class WishlistDTO {
    private Long id;
    private List<WishlistItemDTO> items;

    public WishlistDTO(Long id, List<WishlistItemDTO> items) {
        this.id = id;
        this.items = items;
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
