package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.ProductDTO;
import com.example.digitalstockbackend.model.Product;
import com.example.digitalstockbackend.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private DTOConverter dto;


    @InjectMocks
    private ProductService productService;

    @Test
    void testFetchAllByName_Success() {
        Product product = new Product();
        product.setId(1L);
        product.setName("Product1");

        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(1L);
        productDTO.setName("Product1");

        when(productRepository.findAllByName("Product1")).thenReturn(List.of(product));
        when(dto.convertToProductDTO(product)).thenReturn(productDTO);

        ResponseEntity<List<ProductDTO>> response = productService.fetchAllByName("Product1");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertFalse(response.getBody().isEmpty());
        assertEquals("Product1", response.getBody().get(0).getName());
    }


    @Test
    void testFetchAllByName_NoResults() {
        when(productRepository.findAllByName("Product1")).thenReturn(Collections.emptyList());

        ResponseEntity<List<ProductDTO>> response = productService.fetchAllByName("Product1");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testFetchProductById_Success() {
        Product product = new Product();
        product.setId(1L);
        product.setName("Test Product");

        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(1L);
        productDTO.setName("Test Product");

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(dto.convertToProductDTO(product)).thenReturn(productDTO);

        ResponseEntity<ProductDTO> response = productService.fetchProductById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Test Product", response.getBody().getName());
    }


    @Test
    void testFetchProductById_ProductNotFound() {
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<ProductDTO> response = productService.fetchProductById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }



}
