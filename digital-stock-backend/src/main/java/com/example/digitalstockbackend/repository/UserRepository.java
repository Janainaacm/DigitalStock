package com.example.digitalstockbackend.repository;

import com.example.digitalstockbackend.model.roles.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<CustomUser, Long> {
    Optional<CustomUser> findByUsername(String username);
    Optional<CustomUser> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}

