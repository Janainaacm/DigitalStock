package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.authorities.OrderStatus;
import com.example.digitalstockbackend.dto.OrderDTO;
import com.example.digitalstockbackend.dto.OrderItemDTO;
import com.example.digitalstockbackend.dto.ProductDTO;
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
    private final ProductService productService;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService, CartRepository cartRepository, OrderItemRepository orderItemRepository, ProductService productService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.cartRepository = cartRepository;
        this.orderItemRepository = orderItemRepository;
        this.productService = productService;
    }

    // Fetch Order by ID
    public ResponseEntity<OrderDTO> fetchOrderById(Long id) {
        Order order = orderRepository.findOrderById(id);

        if (order == null) {
            return ResponseEntity.notFound().build();
        }

        OrderDTO orderDTO = convertToOrderDTO(order);
        return ResponseEntity.ok(orderDTO);
    }

    // Fetch Orders by User ID
    public ResponseEntity<List<OrderDTO>> fetchOrdersByUserId(Principal principal) {
        CustomUser requestedUser = userService.getUserByUsername(principal.getName());
        List<Order> requestedOrders = orderRepository.findByUserId(requestedUser.getId());

        List<OrderDTO> orderDTOs = requestedOrders.stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(orderDTOs);
    }

    // Fetch Orders by Status
    public ResponseEntity<List<OrderDTO>> fetchOrdersByStatus(OrderStatus status) {
        List<Order> orders = orderRepository.findByStatus(status);

        List<OrderDTO> orderDTOs = orders.stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(orderDTOs);
    }

    // Place Order
    public ResponseEntity<OrderDTO> placeOrder(Long userId) {
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
            productService.sellProduct(cartItem.getProduct().getId(), cartItem.getQuantity());
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);

        Order savedOrder = orderRepository.save(order);
        orderItemRepository.saveAll(orderItems);

        cart.getItems().clear();
        cartRepository.save(cart);

        OrderDTO orderDTO = convertToOrderDTO(savedOrder);
        return ResponseEntity.ok(orderDTO);
    }

    public ResponseEntity<?> cancelOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    if (order.getStatus() == OrderStatus.PENDING ||
                            order.getStatus() == OrderStatus.ONGOING ||
                            order.getStatus() == OrderStatus.CANCELLED) {

                        order.setStatus(OrderStatus.CANCELLED);
                        orderRepository.save(order);
                        OrderDTO orderDTO = convertToOrderDTO(order);
                        return ResponseEntity.ok(orderDTO);

                    } else {
                        // Explicitly specify the type
                        return ResponseEntity.<OrderDTO>badRequest().build();
                    }
                })
                .orElseGet(() -> ResponseEntity.<OrderDTO>notFound().build());
    }


    // Delete Order
    public ResponseEntity<Void> deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        orderRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Helper: Convert Order to OrderDTO
    private OrderDTO convertToOrderDTO(Order order) {
        return userService.getOrderDTO(order);
    }
}
