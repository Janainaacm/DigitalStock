package com.example.digitalstockbackend.authorities;

public enum OrderStatus {
    PENDING("PENDING"),
    ONGOING("ONGOING"),
    SENT("SENT"),
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
