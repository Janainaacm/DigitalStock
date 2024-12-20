package com.example.digitalstockbackend.dto;

import com.example.digitalstockbackend.model.Cart;

import java.util.List;

public class CartDTO {
    private Long id;
    private List<CartItemDTO> items;

    public CartDTO() {
    }

    public CartDTO(Cart cart) {
        this.id = cart.getId();
        this.items = cart.getItems().stream().map(CartItemDTO::new).toList();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }
}
