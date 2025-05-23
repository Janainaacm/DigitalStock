package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.authorities.OrderStatus;
import com.example.digitalstockbackend.dto.ProductDTO;
import com.example.digitalstockbackend.model.Category;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private DTOConverter dto;

    @InjectMocks
    private AdminService adminService;


    @Test
    void testUpdateProduct_Success() {
        Product existingProduct = new Product();
        existingProduct.setId(1L);
        existingProduct.setName("Old Name");

        ProductDTO updatedDetails = new ProductDTO();
        updatedDetails.setId(1L);
        updatedDetails.setName("New Name");
        updatedDetails.setCategoryName("Electronics");

        Category newCategory = new Category();
        newCategory.setName("Electronics");

        Product convertedProduct = new Product();
        convertedProduct.setId(1L);
        convertedProduct.setName("New Name");
        convertedProduct.setCategory(newCategory);

        when(productRepository.findById(1L)).thenReturn(Optional.of(existingProduct));
        when(dto.convertToProduct(updatedDetails)).thenReturn(convertedProduct);
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ResponseEntity<Product> response = adminService.updateProduct(1L, updatedDetails);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("New Name", response.getBody().getName());
        assertEquals("Electronics", response.getBody().getCategory().getName());
    }



    @Test
    void testUpdateOrderStatus_Success() {
        Order order = new Order();
        order.setId(1L);
        order.setStatus(OrderStatus.PENDING);

        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        ResponseEntity<Order> response = adminService.updateOrderStatus(1L, "DELIVERED");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(OrderStatus.DELIVERED, response.getBody().getStatus());
    }


}
