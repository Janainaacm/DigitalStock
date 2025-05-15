package com.example.digitalstockbackend.service;


import com.example.digitalstockbackend.dto.CategoryDTO;
import com.example.digitalstockbackend.dto.ProductDTO;
import com.example.digitalstockbackend.model.Category;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.repository.CategoryRepository;
import com.example.digitalstockbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final DTOConverter dto;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, DTOConverter dto) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.dto = dto;
    }

    public ResponseEntity<List<ProductDTO>> fetchAllProducts() {
        List<Product> allProducts = productRepository.findAll();

        if (allProducts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<ProductDTO> productDTOs = allProducts.stream()
                .map(dto::convertToProductDTO)
                .toList();

        return ResponseEntity.ok(productDTOs);
    }

    public ResponseEntity<List<ProductDTO>> fetchProductsByCategory(String categoryName) {
        List<Product> list = productRepository.findByCategoryName(categoryName);

        if (list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<ProductDTO> productDTOs = list.stream()
                .map(dto::convertToProductDTO)
                .toList();

        return ResponseEntity.ok(productDTOs);
    }

    public ResponseEntity<List<ProductDTO>> fetchAllByName(String name) {
        List<Product> list = productRepository.findAllByName(name);

        if (list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<ProductDTO> productDTOs = list.stream()
                .map(dto::convertToProductDTO)
                .toList();

        return ResponseEntity.ok(productDTOs);
    }

    public ResponseEntity<ProductDTO> fetchProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);

        if (product.isPresent()) {
            ProductDTO productDTO = dto.convertToProductDTO(product.get());

            return ResponseEntity.ok(productDTO);
        }

        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<List<CategoryDTO>> fetchCategories() {
        List<Category> allCategories = categoryRepository.findAll();

        if (allCategories.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<CategoryDTO> categoriesDTO = allCategories.stream()
                .map(dto::convertToCategoryDTO)
                .toList();
        return ResponseEntity.ok(categoriesDTO);
    }



    //In code

    public int getStock(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow();

        return product.getStock();
    }

    public void sellProduct(Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow();

        product.setSales(product.getSales() + quantity);
        product.setStock(product.getStock() - quantity);

        productRepository.save(product);
    }

}
