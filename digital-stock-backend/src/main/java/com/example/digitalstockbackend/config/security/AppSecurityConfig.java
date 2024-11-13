package com.example.digitalstockbackend.config.security;

import com.example.digitalstockbackend.authorities.UserPermission;
import com.example.digitalstockbackend.authorities.UserRole;
import com.example.digitalstockbackend.config.security.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final PasswordEncoder passwordEncoder;

    public AppSecurityConfig(CustomUserDetailsService customUserDetailsService, PasswordEncoder passwordEncoder) {
        this.customUserDetailsService = customUserDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(auth -> auth
                        .requestMatchers("/", "/login", "/static/**", "/logout", "/custom-logout").permitAll()
                        .requestMatchers(HttpMethod.GET, "/products/**").permitAll()  // Public product viewing
                        .requestMatchers("/wishlist/**", "/purchase/**").hasRole(UserRole.USER.name()) // Restrict wishlist and purchase to USER role
                        .requestMatchers("/admin/**").hasRole(UserRole.ADMIN.name()) // Restrict admin paths to ADMIN role
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login
                        .loginPage("/login")
                        .defaultSuccessUrl("/")
                        .failureUrl("/login?error=true")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/custom-logout")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("remember-me", "JSESSIONID")
                )
                .rememberMe(rememberMe -> rememberMe
                        .key("secureKeyForRememberMe")
                        .tokenValiditySeconds((int) TimeUnit.DAYS.toSeconds(21))
                        .userDetailsService(customUserDetailsService)
                );

        return http.build();
    }
}

