package com.example.digitalstockbackend.repository;


import com.example.digitalstockbackend.model.Category;
import com.example.digitalstockbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryName(String categoryName);
    List<Product> findAllByName(String name);
}

