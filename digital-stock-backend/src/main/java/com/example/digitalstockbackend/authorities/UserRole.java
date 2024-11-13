package com.example.digitalstockbackend.authorities;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.example.digitalstockbackend.authorities.UserPermission.*;

public enum UserRole {

    GUEST(VIEW_PRODUCTS),
    USER(VIEW_PRODUCTS, ADD_TO_WISHLIST, PURCHASE),
    ADMIN(VIEW_PRODUCTS, ADD_TO_WISHLIST, PURCHASE, MANAGE_USERS, MANAGE_PRODUCTS, MANAGE_ORDERS);

    private final List<String> permission;

    UserRole(UserPermission... permissionList) {
        this.permission = Arrays.stream(permissionList)
                .map(UserPermission::getPermission)
                .toList();
    }

    public List<String> getListOfPermissions() {
        return permission;
    }

    public List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> simpleGrantedAuthorityList = new ArrayList<>();
        simpleGrantedAuthorityList.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        simpleGrantedAuthorityList.addAll(getListOfPermissions().stream().map(SimpleGrantedAuthority::new).toList());
        return simpleGrantedAuthorityList;
    }
}

