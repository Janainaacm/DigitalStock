package com.example.digitalstockbackend.dto;

import com.example.digitalstockbackend.model.Order;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDTO {
    private Long id;
    private String status;
    private LocalDateTime orderDate;

    // Personal details
    private String firstName;
    private String lastName;
    private String phoneNo;
    private String email;

    // Shipping details
    private AddressDTO address;
    private Long subtotal;

    private List<OrderItemDTO> orderItems;

    public OrderDTO() {}

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.status = order.getStatus().toString();
        this.orderDate = order.getOrderDate();

        // Personal details
        this.firstName = order.getFirstName();
        this.lastName = order.getLastName();
        this.phoneNo = order.getPhoneNo();
        this.email = order.getEmail();

        // Shipping details
        this.address = order.getAddress() != null ? new AddressDTO(order.getAddress()) : null;
        this.subtotal = order.getSubtotal();

        // Order items
        this.orderItems = order.getOrderItems().stream().map(OrderItemDTO::new).toList();
    }

    // Getters and setters
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    public Long getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Long subtotal) {
        this.subtotal = subtotal;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }
}
