package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.dto.CategoryDTO;
import com.example.digitalstockbackend.dto.ProductDTO;
import com.example.digitalstockbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> fetchAllProducts() {
        return productService.fetchAllProducts();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<ProductDTO> fetchProductById(@PathVariable Long id) {
        return productService.fetchProductById(id);
    }

    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<ProductDTO>> fetchProductsByCategory(@PathVariable String categoryName) {
        return productService.fetchProductsByCategory(categoryName);
    }

    @GetMapping("/name/{productName}/colors")
    public ResponseEntity<List<ProductDTO>> fetchProductsByProductName(@PathVariable String productName) {
        return productService.fetchAllByName(productName);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> fetchCategories() {
        return productService.fetchCategories();
    }

}

