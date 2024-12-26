package com.example.digitalstockbackend.model;

import com.example.digitalstockbackend.model.roles.CustomUser;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private CustomUser user;

    @OneToMany(mappedBy = "wishlist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WishlistItem> items;


    public Wishlist () {};

    public Wishlist(Long id, CustomUser user, List<WishlistItem> items) {
        this.id = id;
        this.user = user;
        this.items = items;
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

    public List<WishlistItem> getItems() {
        return items;
    }

    public void setItems(List<WishlistItem> items) {
        this.items = items;
    }
}



