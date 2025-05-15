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
    private final DTOConverter dto;

    public AdminService(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository, CategoryRepository categoryRepository, DTOConverter dto) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.dto = dto;
    }

    //Users
    public ResponseEntity<List<UserDTO>> fetchAllUsers() {
        List<CustomUser> users = userRepository.findAll();

        List<UserDTO> userDTOs = users.stream()
                .map(dto::convertToUserDTO).toList();

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

        List<OrderDTO> dtoList = list.stream().map(dto::convertToOrderDTO).toList();

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
        Product product = dto.convertToProduct(productDTO);
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    public ResponseEntity<Product> updateProduct(Long id, ProductDTO productDetails) {
        Product newData = dto.convertToProduct(productDetails);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(newData.getName());
        product.setDescription(newData.getDescription());
        product.setPrice(newData.getPrice());
        product.setCategory(newData.getCategory());
        product.setColorName(newData.getColorName());
        product.setImage(newData.getImage());
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

        CategoryDTO createdCategoryDTO = new CategoryDTO(savedCategory.getId(), savedCategory.getName());

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


