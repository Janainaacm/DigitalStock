package com.example.digitalstockbackend.controller;

import com.example.digitalstockbackend.authorities.OrderStatus;
import com.example.digitalstockbackend.dto.OrderDTO;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> fetchOrderById(@PathVariable Long orderId) {
        return orderService.fetchOrderById(orderId);
    }

    @GetMapping("/user")
    public ResponseEntity<List<OrderDTO>> fetchOrdersByUserId(Principal principal) {
        return orderService.fetchOrdersByUserId(principal);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<OrderDTO>> fetchOrdersByStatus(@PathVariable String status) {
        OrderStatus orderStatus;
        try {
            orderStatus = OrderStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
        return orderService.fetchOrdersByStatus(orderStatus);
    }

    @PostMapping("/place/{userId}")
    public ResponseEntity<OrderDTO> placeOrder(@PathVariable Long userId, @RequestBody OrderDTO orderDTO) {
        return orderService.placeOrder(userId, orderDTO);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId) {
        return orderService.cancelOrder(orderId);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        return orderService.deleteOrder(orderId);
    }
}


