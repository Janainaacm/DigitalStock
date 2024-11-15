package com.example.digitalstockbackend.repository;


import com.example.digitalstockbackend.model.Category;
import com.example.digitalstockbackend.model.Color;
import com.example.digitalstockbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);
    List<Product> findByCategory(Category category);
}

