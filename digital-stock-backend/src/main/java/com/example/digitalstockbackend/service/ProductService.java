package com.example.digitalstockbackend.service;


import com.example.digitalstockbackend.dto.ProductDTO;
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

    public ResponseEntity<List<ProductDTO>> fetchAllProducts() {
        List<Product> allProducts = productRepository.findAll();

        if (allProducts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<ProductDTO> productDTOs = allProducts.stream()
                .map(ProductDTO::new)
                .toList();

        return ResponseEntity.ok(productDTOs);
    }

    public ResponseEntity<List<ProductDTO>> fetchProductsByCategory(String categoryName) {
        List<Product> list = productRepository.findByCategoryName(categoryName);

        if (list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<ProductDTO> productDTOs = list.stream()
                .map(ProductDTO::new)
                .toList();

        return ResponseEntity.ok(productDTOs);
    }

    public ResponseEntity<List<ProductDTO>> fetchAllByName(String name) {
        List<Product> list = productRepository.findAllByName(name);

        if (list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<ProductDTO> productDTOs = list.stream()
                .map(ProductDTO::new)
                .toList();

        return ResponseEntity.ok(productDTOs);
    }

    public ResponseEntity<ProductDTO> fetchProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);

        if (product.isPresent()) {
            ProductDTO productDTO = new ProductDTO(product.get());

            return ResponseEntity.ok(productDTO);
        }

        return ResponseEntity.notFound().build();
    }



    //In code
    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElse(null);
    }

    public void sellProduct(Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow();

        product.setSales(product.getSales() + quantity);
    }

}
