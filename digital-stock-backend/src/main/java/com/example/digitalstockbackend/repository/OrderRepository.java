package com.example.digitalstockbackend.repository;


import com.example.digitalstockbackend.authorities.OrderStatus;
import com.example.digitalstockbackend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus (OrderStatus status);
    List<Order> findByUserId(Long id);
    Order findOrderById (Long id);
}

