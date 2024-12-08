package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.dto.CategoryDTO;
import com.example.digitalstockbackend.dto.ProductDTO;
import com.example.digitalstockbackend.dto.UserDTO;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    // Handle product management
    @PostMapping("/products/new")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return adminService.createProduct(product);
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product productDetails) {
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


    // Handle order management
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return adminService.fetchAllOrders();
    }

    @PutMapping("/orders/update/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestBody String orderStatus) {
        return adminService.updateOrderStatus(orderId, orderStatus);
    }
}
