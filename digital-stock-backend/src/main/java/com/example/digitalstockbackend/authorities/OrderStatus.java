package com.example.digitalstockbackend.authorities;

public enum OrderStatus {
    PENDING("PENDING"),
    CONFIRMED("CONFIRMED"),
    SHIPPED("SHIPPED"),
    DELIVERED("DELIVERED"),
    CANCELLED("CANCELLED");

    private final String status;

    OrderStatus(String status1) {
        this.status = status1;
    }

    public String getStatus() {
        return status;
    }
}
