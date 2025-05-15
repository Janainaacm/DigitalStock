package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.authorities.OrderStatus;
import com.example.digitalstockbackend.dto.AddressDTO;
import com.example.digitalstockbackend.dto.OrderDTO;
import com.example.digitalstockbackend.model.Address;
import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.OrderItem;
import com.example.digitalstockbackend.model.roles.ERole;
import com.example.digitalstockbackend.repository.CartRepository;
import com.example.digitalstockbackend.repository.OrderItemRepository;
import com.example.digitalstockbackend.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
    private final DTOConverter dto;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService, CartRepository cartRepository,
                        OrderItemRepository orderItemRepository, ProductService productService, DTOConverter dto) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.cartRepository = cartRepository;
        this.orderItemRepository = orderItemRepository;
        this.productService = productService;
        this.dto = dto;
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
    public ResponseEntity<List<OrderDTO>> fetchOrdersByUserId(Long userId) {
        CustomUser requestedUser = userService.getUserById(userId);
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
    @Transactional
    public ResponseEntity<OrderDTO> placeOrder(Long userId, OrderDTO orderDTO) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);

        if (optionalCart.isEmpty()) {
            throw new RuntimeException("Cart is empty, cannot place an order");
        }
        Cart cart = optionalCart.get();

        Order order = new Order();
        order.setUser(cart.getUser());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        // Set personal details
        order.setFirstName(orderDTO.getFirstName());
        order.setLastName(orderDTO.getLastName());
        order.setPhoneNo(orderDTO.getPhoneNo());
        order.setEmail(orderDTO.getEmail());

        // Set shipping details
        order.setAddress(convertToAddressEntity(orderDTO.getAddress()));
        order.setSubtotal(orderDTO.getSubtotal());


        cart.getItems().forEach(cartItem -> {
            int availableStock = productService.getStock(cartItem.getProduct().getId());
            if (availableStock < cartItem.getQuantity()) {
                throw new RuntimeException("Product " + cartItem.getProduct().getName() + " is out of stock.");
            }
        });


        // Map cart items to order items
        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            productService.sellProduct(cartItem.getProduct().getId(), cartItem.getQuantity());
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);

        // Save order and clear cart
        Order savedOrder = orderRepository.save(order);
        orderItemRepository.saveAll(orderItems);

        cart.getItems().clear();
        cartRepository.save(cart);

        OrderDTO newOrderDTO = convertToOrderDTO(savedOrder);
        return ResponseEntity.ok(newOrderDTO);
    }

    public ResponseEntity<?> cancelOrder(Long orderId, Long userId) {
        CustomUser user = userService.getUserById(userId);
        return orderRepository.findById(orderId)
                .map(order -> {
                    if (user.getRole().getName() == ERole.ROLE_ADMIN || order.getUser().getId().equals(user.getId())) {
                        if (order.getStatus() == OrderStatus.PENDING) {

                            order.setStatus(OrderStatus.CANCELLED);
                            orderRepository.save(order);
                            OrderDTO orderDTO = convertToOrderDTO(order);
                            return ResponseEntity.ok(orderDTO);

                        } else {
                            return ResponseEntity.badRequest().body("Order cannot be cancelled unless it is in PENDING status.");
                        }
                    } else {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to cancel this order.");
                    }
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found."));
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
        return dto.convertToOrderDTO(order);
    }

    private Address convertToAddressEntity(AddressDTO addressDTO) {
        if (addressDTO == null) {
            return null;
        }
        Address address = new Address();
        address.setAddressLine(addressDTO.getAddressLine());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setZipCode(addressDTO.getZipCode());
        return address;
    }

}

