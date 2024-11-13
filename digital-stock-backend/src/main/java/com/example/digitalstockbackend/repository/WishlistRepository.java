package com.example.digitalstockbackend.repository;

import com.example.digitalstockbackend.model.Wishlist;
import com.example.digitalstockbackend.model.CustomUser;
import com.example.digitalstockbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUser(CustomUser user);
    Optional<Wishlist> findByUserAndProduct(CustomUser user, Product product);
    void deleteByUserAndProduct(CustomUser user, Product product);
}

