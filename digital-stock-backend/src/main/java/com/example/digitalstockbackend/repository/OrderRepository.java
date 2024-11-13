package com.example.digitalstockbackend.repository;


import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(CustomUser user);
    List<Order> findByStatus (String status);
}

