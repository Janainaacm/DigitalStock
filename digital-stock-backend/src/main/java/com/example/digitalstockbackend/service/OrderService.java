package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.authorities.OrderStatus;
import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.OrderItem;
import com.example.digitalstockbackend.repository.CartRepository;
import com.example.digitalstockbackend.repository.OrderItemRepository;
import com.example.digitalstockbackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final CartRepository cartRepository;
    private final OrderItemRepository orderItemRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService, CartRepository cartRepository, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.cartRepository = cartRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public ResponseEntity<Order> fetchOrderById(Long id) {
        Order order = orderRepository.findOrderById(id);

        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    public ResponseEntity<List<Order>> fetchOrdersByUserId(Principal principal) {
        CustomUser requestedUser = userService.getUserByUsername(principal.getName());
        List<Order> requestedList = orderRepository.findByUserId(requestedUser.getId());
        return ResponseEntity.ok(requestedList);
    }

    public ResponseEntity<List<Order>> fetchOrdersByStatus(OrderStatus status) {
        List<Order> orders = orderRepository.findByStatus(status);

        return ResponseEntity.ok(orders);
    }

    public ResponseEntity<Order> placeOrder(Long userId) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);

        if (optionalCart.isEmpty()) {
            throw new RuntimeException("Cart is empty, cannot place an order");
        }
        Cart cart = optionalCart.get();

        Order order = new Order();
        order.setUser(cart.getUser());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);

        Order savedOrder = orderRepository.save(order);
        orderItemRepository.saveAll(orderItems);

        cart.getItems().clear();
        cartRepository.save(cart);

        return ResponseEntity.ok(savedOrder);

    }

    public ResponseEntity<Order> cancelOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    if (order.getStatus() == OrderStatus.PENDING ||
                            order.getStatus() == OrderStatus.ONGOING ||
                            order.getStatus() == OrderStatus.CANCELLED) {

                        order.setStatus(OrderStatus.CANCELLED);
                        orderRepository.save(order);
                        return ResponseEntity.ok(order);

                    } else {
                        return ResponseEntity.badRequest().body(order);
                    }
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public ResponseEntity<Void> deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        orderRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }


}
