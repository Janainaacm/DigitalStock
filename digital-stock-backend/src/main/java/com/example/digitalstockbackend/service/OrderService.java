package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.model.CustomUser;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
    }

    public List<Order> getOrdersByUser(String username) {
        CustomUser user = userService.getUserByUsername(username);
        return orderRepository.findByUser(user);
    }


    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Long id, Order orderDetails) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setQuantity(orderDetails.getQuantity());
                    order.setStatus(orderDetails.getStatus());
                    order.setPointsEarned(orderDetails.getPointsEarned());
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
