package com.example.digitalstockbackend.controller;

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
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {


    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }


    // Handle user management
    @GetMapping("/users")
    public ResponseEntity<List<CustomUser>> getAllUsers() {
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
