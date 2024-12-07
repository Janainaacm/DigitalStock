package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.authorities.OrderStatus;
import com.example.digitalstockbackend.dto.CategoryDTO;
import com.example.digitalstockbackend.dto.ProductDTO;
import com.example.digitalstockbackend.model.Category;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.repository.CategoryRepository;
import com.example.digitalstockbackend.repository.OrderRepository;
import com.example.digitalstockbackend.repository.ProductRepository;
import com.example.digitalstockbackend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class AdminService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public AdminService(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    //Users
    public ResponseEntity<List<CustomUser>> fetchAllUsers() {
        List<CustomUser> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }


    //Orders
    public ResponseEntity<List<Order>> fetchAllOrders() {
        List<Order> list = orderRepository.findAll();

        return ResponseEntity.ok(list);
    }

    public ResponseEntity<Order> updateOrderStatus(Long orderId, String newStatus) {
        OrderStatus status;
        try {
            status = OrderStatus.valueOf(newStatus.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid order status");
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        orderRepository.save(order);

        return ResponseEntity.ok(order);
    }



    //Products
    public ResponseEntity<Product> createProduct(Product product) {
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    public ResponseEntity<Product> updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setCategory(productDetails.getCategory());
        product.setColorName(productDetails.getColorName());
        product.setImageUrl(productDetails.getImageUrl());
        product.setStock(productDetails.getStock());

        Product updatedProduct = productRepository.save(product);

        return ResponseEntity.ok(updatedProduct);
    }

    public ResponseEntity<Void> deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<CategoryDTO> addCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());

        Category savedCategory = categoryRepository.save(category);

        CategoryDTO createdCategoryDTO = new CategoryDTO();
        createdCategoryDTO.setId(savedCategory.getId());
        createdCategoryDTO.setName(savedCategory.getName());

        return ResponseEntity.ok(createdCategoryDTO);
    }

    public ResponseEntity<Void> deleteCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            return ResponseEntity.notFound().build();
        }
        categoryRepository.deleteById(categoryId);
        return ResponseEntity.noContent().build();
    }
}


