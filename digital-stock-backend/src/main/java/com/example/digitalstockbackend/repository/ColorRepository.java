package com.example.digitalstockbackend.repository;


import com.example.digitalstockbackend.model.Color;
import com.example.digitalstockbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {
    Optional<Color> findByColorName(String colorName);
    List<Color> findByProduct(Product product);
}

