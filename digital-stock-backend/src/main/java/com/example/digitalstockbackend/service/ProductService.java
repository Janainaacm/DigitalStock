package com.example.digitalstockbackend.service;


import com.example.digitalstockbackend.model.Category;
import com.example.digitalstockbackend.model.Color;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.repository.ColorRepository;
import com.example.digitalstockbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ColorRepository colorRepository) {
        this.productRepository = productRepository;
        this.colorRepository = colorRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(); //Create exceptions class
    }

    public List<Color> getProductColors(Long id) {
        return colorRepository.findByProductId(id);
    }

    public List<Product> getProductsByCategory(Category category) {
        return productRepository.findByCategory(category);
    }


    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setCategory(productDetails.getCategory());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
