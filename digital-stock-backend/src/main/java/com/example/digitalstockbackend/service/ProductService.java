package com.example.digitalstockbackend.service;


import com.example.digitalstockbackend.model.Category;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ResponseEntity<List<Product>> fetchAllProducts() {
        List<Product> allProducts = productRepository.findAll();
        if (allProducts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(allProducts);
    }

    public ResponseEntity<List<Product>> fetchProductsByCategory(Category category) {
        List<Product> list = productRepository.findByCategory(category);

        if (list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(list);

    }

    public ResponseEntity<List<Product>> fetchAllByName(String name) {
        List<Product> list = productRepository.findAllByName(name);


        if (list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(list);
    }

    public ResponseEntity<Product> fetchProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        }
        return ResponseEntity.notFound().build();
    }


    //In code
    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElse(null);
    }

}
