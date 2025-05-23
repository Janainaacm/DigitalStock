package com.example.digitalstockbackend.model.roles;

import com.example.digitalstockbackend.model.Cart;
import com.example.digitalstockbackend.model.Order;
import com.example.digitalstockbackend.model.Address;

import com.example.digitalstockbackend.model.Wishlist;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class CustomUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 4, max = 32, message = "Username must be between 4-32 chars")
    private String username;

    @NotBlank
    @Size(min = 7, message = "Password must be at least 7 characters")
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Order> userOrders;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.EAGER)
    private Wishlist wishlist;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.EAGER)
    private Cart cart;

    private String firstName;

    private String lastName;

    private String phoneNo;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    private boolean isAccountNonExpired = true;
    private boolean isAccountNonLocked = true;
    private boolean isCredentialsNonExpired = true;
    private boolean isEnabled = true;


    public CustomUser(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = null;
    }

    public @NotBlank @Email String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank @Email String email) {
        this.email = email;
    }

    public @NotBlank @Size(min = 4, max = 32, message = "Username must be between 4-32 chars") String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank @Size(min = 4, max = 32, message = "Username must be between 4-32 chars") String username) {
        this.username = username;
    }

    public @NotBlank @Size(min = 7, message = "Password must be at least 7 characters") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank @Size(min = 7, message = "Password must be at least 7 characters") String password) {
        this.password = password;
    }

}

