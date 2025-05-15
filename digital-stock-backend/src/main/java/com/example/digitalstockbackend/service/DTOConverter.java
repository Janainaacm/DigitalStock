package com.example.digitalstockbackend.service;

import com.example.digitalstockbackend.dto.*;
import com.example.digitalstockbackend.model.*;
import com.example.digitalstockbackend.model.roles.CustomUser;
import com.example.digitalstockbackend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLConnection;
import java.util.Base64;

@Service
public class DTOConverter {

    private final CategoryRepository categoryRepository;

    public DTOConverter(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public UserDTO convertToUserDTO(CustomUser user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().getName().name())
                .address(user.getAddress() != null ? convertToAddressDTO(user.getAddress()) : null)
                .wishlist(user.getWishlist() != null ? convertToWishlistDTO(user.getWishlist()) : null)
                .cart(user.getCart() != null ? convertToCartDTO(user.getCart()) : null)
                .orders(user.getUserOrders().stream().map(this::convertToOrderDTO).toList())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phoneNo(user.getPhoneNo())
        .build();
    }

    public AddressDTO convertToAddressDTO(Address address) {
        return AddressDTO.builder()
                .addressLine(address.getAddressLine())
                .city(address.getCity())
                .state(address.getState())
                .zipCode(address.getZipCode())
                .build();
    }


    public ProductDTO convertToProductDTO(Product product) {
        String base64Image = null;

        byte[] img = product.getImage();
        if (img != null && img.length > 0) {
            String base64 = Base64.getEncoder().encodeToString(img);
            String mimeType = detectImageMimeType(img);
            base64Image = "data:" + mimeType + ";base64," + base64;
        }

        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .colorName(product.getColorName())
                .image(base64Image)
                .stock(product.getStock())
                .price(product.getPrice())
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .sales(product.getSales())
                .build();
    }

    public Product convertToProduct(ProductDTO productDTO) {
        byte[] imageBytes = null;

        String base64Image = productDTO.getImage();
        if (base64Image != null && base64Image.contains(",")) {
            try {
                String base64 = base64Image.split(",")[1];
                imageBytes = Base64.getDecoder().decode(base64);
            } catch (IllegalArgumentException e) {
                imageBytes = null;
            }
        }

        return Product.builder()
                .id(productDTO.getId())
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .colorName(productDTO.getColorName())
                .image(imageBytes)
                .stock(productDTO.getStock())
                .price(productDTO.getPrice())
                .category(categoryRepository.findByName(productDTO.getCategoryName()))
                .sales(productDTO.getSales())
                .build();
    }


    public CategoryDTO convertToCategoryDTO(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }

    public OrderDTO convertToOrderDTO (Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .status(order.getStatus().toString())
                .orderDate(order.getOrderDate())
                .firstName(order.getFirstName())
                .lastName(order.getLastName())
                .phoneNo(order.getPhoneNo())
                .email(order.getEmail())
                .address(order.getAddress() != null ? convertToAddressDTO(order.getAddress()) : null)
                .subtotal(order.getSubtotal())
                .orderItems(order.getOrderItems().stream().map(this::convertToOrderItemDTO).toList())
                .build();
    }

    public OrderItemDTO convertToOrderItemDTO (OrderItem orderItem) {
        return OrderItemDTO.builder()
                .id(orderItem.getId())
                .product(convertToProductDTO(orderItem.getProduct()))
                .quantity(orderItem.getQuantity())
                .build();
    }


    public WishlistDTO convertToWishlistDTO(Wishlist wishlist) {
        return WishlistDTO.builder()
                .id(wishlist.getId())
                .items(wishlist.getItems().stream().map(this::convertToWishlistItemDTO).toList())
                .build();
    }

    public WishlistItemDTO convertToWishlistItemDTO(WishlistItem wishlistItem) {
        return WishlistItemDTO.builder()
                .id(wishlistItem.getId())
                .product(convertToProductDTO(wishlistItem.getProduct()))
                .build();
    }



    public CartDTO convertToCartDTO(Cart cart) {
        return CartDTO.builder()
                .id(cart.getId())
                .items(cart.getItems().stream().map(this::convertToCartItemDTO).toList())
                .build();
    }

    public CartItemDTO convertToCartItemDTO(CartItem cartItem) {
        return CartItemDTO.builder()
                .id(cartItem.getId())
                .product(convertToProductDTO(cartItem.getProduct()))
                .quantity(cartItem.getQuantity())
                .build();
    }

    private String detectImageMimeType(byte[] imageBytes) {
        try (ByteArrayInputStream byteArray = new ByteArrayInputStream(imageBytes)) {
            String mimeType = URLConnection.guessContentTypeFromStream(byteArray);
            return (mimeType != null) ? mimeType : "application/octet-stream";
        } catch (IOException e) {
            return "application/octet-stream";
        }
    }
}
