package com.example.digitalstockbackend.config.security;

import com.example.digitalstockbackend.model.roles.CustomUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

public class CustomUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String username;

    private String email;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(Long id, String username, String email, String password,
                           Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static CustomUserDetails build(CustomUser user) {
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getName().name());

        return new CustomUserDetails(user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                List.of(authority));
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        CustomUserDetails user = (CustomUserDetails) o;
        return Objects.equals(id, user.id);
    }
}

