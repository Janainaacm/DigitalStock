package com.example.digitalstockbackend.dto;

import com.example.digitalstockbackend.model.Order;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDTO {
    private Long id;
    private String status;
    private LocalDateTime orderDate;
    private String addressLine;
    private String city;
    private String state;
    private String zipCode;
    private List<OrderItemDTO> orderItems;

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.status = order.getStatus().toString();
        this.orderDate = order.getOrderDate();
        this.addressLine = order.getAddressLine();
        this.city = order.getCity();
        this.state = order.getState();
        this.zipCode = order.getZipCode();
        this.orderItems = order.getOrderItems().stream().map(OrderItemDTO::new).toList();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }
}
