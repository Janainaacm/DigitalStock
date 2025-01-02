package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.authorities.OrderStatus;
import com.example.digitalstockbackend.dto.*;
import com.example.digitalstockbackend.model.Category;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.repository.CategoryRepository;
import com.example.digitalstockbackend.repository.OrderRepository;
import com.example.digitalstockbackend.repository.ProductRepository;
import com.example.digitalstockbackend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
    public ResponseEntity<List<UserDTO>> fetchAllUsers() {
        List<CustomUser> users = userRepository.findAll();

        List<UserDTO> userDTOs = users.stream()
                .map(UserDTO::new).toList();

        return ResponseEntity.ok(userDTOs);
    }

    public ResponseEntity<String> deleteUser(Long userId) {
        try {
            CustomUser user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            userRepository.deleteById(user.getId());
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }



    //Orders
    public ResponseEntity<List<OrderDTO>> fetchAllOrders() {
        List<Order> list = orderRepository.findAll();

        List<OrderDTO> dtoList = list.stream().map(OrderDTO::new).toList();

        return ResponseEntity.ok(dtoList);
    }

    public ResponseEntity<Order> updateOrderStatus(Long orderId, String newStatus) {
        OrderStatus status;
        try {
            status = OrderStatus.valueOf(newStatus);
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
    public ResponseEntity<Product> createProduct(ProductDTO productDTO) {
        Product product = convertToProduct(productDTO);
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    public ResponseEntity<Product> updateProduct(Long id, ProductDTO productDetails) {
        Product newData = convertToProduct(productDetails);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(newData.getName());
        product.setDescription(newData.getDescription());
        product.setPrice(newData.getPrice());
        product.setCategory(newData.getCategory());
        product.setColorName(newData.getColorName());
        product.setImageUrl(newData.getImageUrl());
        product.setStock(newData.getStock());

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


    private Product convertToProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());
        product.setColorName(productDTO.getColorName());
        product.setImageUrl(productDTO.getImageUrl());
        product.setSales(productDTO.getSales());
        product.setCategory(categoryRepository.findByName(productDTO.getCategoryName()));

        return product;
    }
}


