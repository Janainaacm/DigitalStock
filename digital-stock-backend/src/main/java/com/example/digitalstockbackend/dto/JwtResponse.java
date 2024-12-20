package com.example.digitalstockbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class JwtResponse {
    @JsonProperty("authToken")
    private String token;

    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> role;

    public JwtResponse(String accessToken, Long id, String username, String email, List<String> role) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public String getAuthToken() {
        return token;
    }

    public void setAuthToken(String authToken) {
        this.token = authToken;
    }


    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRole() {
        return role;
    }
}