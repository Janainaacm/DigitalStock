package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.model.CustomUser;
import com.example.digitalstockbackend.service.OrderService;
import com.example.digitalstockbackend.service.ProductService;
import com.example.digitalstockbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final ProductService productService;
    private final UserService userService;
    private final OrderService orderService;

    @Autowired
    public AdminController(ProductService productService, UserService userService, OrderService orderService) {
        this.productService = productService;
        this.userService = userService;
        this.orderService = orderService;
    }

    // Handle product management
    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        product.getColors().forEach(color -> color.setProduct(product));
        return productService.saveProduct(product);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        return productService.updateProduct(id, productDetails);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }




    // Handle user management
    @GetMapping("/users")
    public List<CustomUser> getAllUsers() {
        return userService.getAllUsers();
    }






    // Handle order management
    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
}
