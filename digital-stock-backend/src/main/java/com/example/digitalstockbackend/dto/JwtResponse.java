package com.example.digitalstockbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    @JsonProperty("authToken")
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> role;
}