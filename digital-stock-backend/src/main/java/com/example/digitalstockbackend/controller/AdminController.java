package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.dto.CategoryDTO;
import com.example.digitalstockbackend.dto.OrderDTO;
import com.example.digitalstockbackend.dto.ProductDTO;
import com.example.digitalstockbackend.dto.UserDTO;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }


    // Handle user management
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return adminService.fetchAllUsers();
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        return adminService.deleteUser(userId);
    }


    // Handle product management
    @PostMapping("/products/new")
    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO product) {
        return adminService.createProduct(product);
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody ProductDTO productDetails) {
        return adminService.updateProduct(productId, productDetails);
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        return adminService.deleteProduct(productId);
    }

    @PostMapping("/categories/add")
    public ResponseEntity<CategoryDTO> addCategory(@RequestBody CategoryDTO categoryDTO) {
        return adminService.addCategory(categoryDTO);
    }

    @DeleteMapping("/categories/delete/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
        return adminService.deleteCategory(categoryId);
    }

    @PostMapping("/{productId}/upload-image")
    public ResponseEntity<String> uploadLogo(@PathVariable Long productId, @RequestParam("file") MultipartFile file) {
        return adminService.uploadProductImage(productId, file);
    }


    // Handle order management
    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return adminService.fetchAllOrders();
    }

    @PutMapping("/orders/update/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return adminService.updateOrderStatus(orderId, status);
    }

}
