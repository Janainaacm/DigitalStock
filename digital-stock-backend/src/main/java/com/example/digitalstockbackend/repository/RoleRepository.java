package com.example.digitalstockbackend.repository;

import java.util.Optional;

import com.example.digitalstockbackend.model.roles.ERole;
import com.example.digitalstockbackend.model.roles.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}