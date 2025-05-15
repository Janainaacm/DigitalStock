package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.WishlistDTO;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.model.Wishlist;
import com.example.digitalstockbackend.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WishlistServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private WishlistRepository wishlistRepository;

    @Mock
    private DTOConverter dto;

    @Mock
    private UserService userService;

    @InjectMocks
    private WishlistService wishlistService;


    @Test
    void testAddProductToWishlist_Success() {
        Product product = new Product();
        product.setId(1L);

        Wishlist wishlist = new Wishlist();
        wishlist.setId(1L);
        wishlist.setItems(new ArrayList<>());

        WishlistDTO wishlistDTO = new WishlistDTO();
        wishlistDTO.setId(1L);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(wishlistRepository.save(any(Wishlist.class))).thenReturn(wishlist);
        when(dto.convertToWishlistDTO(wishlist)).thenReturn(wishlistDTO);

        ResponseEntity<WishlistDTO> response = wishlistService.addProductToWishlist(1L, 1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1L, response.getBody().getId());
    }


    @Test
    void testAddProductToWishlist_ProductNotFound() {
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<WishlistDTO> response = wishlistService.addProductToWishlist(1L, 1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

}
