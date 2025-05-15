package com.example.digitalstockbackend.authorities;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
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

}
