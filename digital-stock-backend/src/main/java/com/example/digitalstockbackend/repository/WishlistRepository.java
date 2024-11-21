package com.example.digitalstockbackend.repository;

import com.example.digitalstockbackend.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserId(Long id);
    Optional<Wishlist> findByUserIdAndProductId(Long userId, Long productId);
}

