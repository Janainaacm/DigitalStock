package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.model.Category;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> fetchAllProducts() {
        return productService.fetchAllProducts();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Product> fetchProductById(@PathVariable Long id) {
        return productService.fetchProductById(id);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> fetchProductsByCategory(@PathVariable Category category) {
        return productService.fetchProductsByCategory(category);
    }

    @GetMapping("/name/{productName}/colors")
    public ResponseEntity<List<Product>> fetchProductsByProductName(@PathVariable String productName) {
        return productService.fetchAllByName(productName);
    }

}

