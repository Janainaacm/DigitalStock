package com.example.digitalstockbackend.model;

import jakarta.persistence.*;


@Entity
public class WishlistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "wishlist_id")
    private Wishlist wishlist;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;


    public WishlistItem() {
    }
    public WishlistItem(Wishlist wishlist, Product product) {
        this.wishlist = wishlist;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Wishlist getWishlist() {
        return wishlist;
    }

    public void setWishlist(Wishlist wishlist) {
        this.wishlist = wishlist;
    }
}
