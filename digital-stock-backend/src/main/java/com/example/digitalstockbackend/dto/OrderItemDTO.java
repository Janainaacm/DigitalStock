package com.example.digitalstockbackend.dto;

import com.example.digitalstockbackend.model.OrderItem;

public class OrderItemDTO {
    private Long id;
    private ProductDTO product;
    private int quantity;

    public OrderItemDTO(OrderItem orderItem) {
        this.id = orderItem.getId();
        this.product = new ProductDTO(orderItem.getProduct());
        this.quantity = orderItem.getQuantity();
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
