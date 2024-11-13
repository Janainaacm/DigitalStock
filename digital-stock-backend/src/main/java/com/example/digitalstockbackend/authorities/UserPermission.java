package com.example.digitalstockbackend.authorities;

public enum UserPermission {
    VIEW_PRODUCTS("VIEW_PRODUCTS"),
    ADD_TO_WISHLIST("ADD_TO_WISHLIST"),
    PURCHASE("PURCHASE"),
    MANAGE_USERS("MANAGE_USERS"),
    MANAGE_PRODUCTS("MANAGE_PRODUCTS"),
    MANAGE_ORDERS("MANAGE_ORDERS");

    private final String permission;

    UserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}

