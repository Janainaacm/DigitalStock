package com.example.digitalstockbackend.model;

import com.example.digitalstockbackend.authorities.OrderStatus;
import com.example.digitalstockbackend.model.roles.CustomUser;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private CustomUser user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Status is required")
    private OrderStatus status;

    private int pointsEarned;

    private LocalDateTime orderDate;

    public Order () {};

    public Order(Long id, CustomUser user, List<OrderItem> orderItems, OrderStatus status, int pointsEarned, LocalDateTime orderDate) {
        this.id = id;
        this.user = user;
        this.orderItems = orderItems;
        this.status = status;
        this.pointsEarned = pointsEarned;
        this.orderDate = orderDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustomUser getUser() {
        return user;
    }

    public void setUser(CustomUser user) {
        this.user = user;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public int getPointsEarned() {
        return pointsEarned;
    }

    public void setPointsEarned(int pointsEarned) {
        this.pointsEarned = pointsEarned;
    }

    public LocalDateTime getOrderDate() {
        return LocalDateTime.now();
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
}

