package com.example.digitalstockbackend.dto;

import com.example.digitalstockbackend.model.Address;

public class AddressDTO {
    private String addressLine;
    private String city;
    private String state;
    private String zipCode;

    public AddressDTO() {
    }

    public AddressDTO(Address address) {
        this.addressLine = address.getAddressLine();
        this.city = address.getCity();
        this.state = address.getState();
        this.zipCode = address.getZipCode();
    }

    // Getters and setters
    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}
