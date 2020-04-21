package com.molveno.rentAboat.modules;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Pricing {
    @Id
    @GeneratedValue
    private Long id;

    private String boatType;
    private Integer basePrice;
    private String startCustomPricing;
    private String endCustomPricing;
    private Integer customPricing;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBoatType() {
        return boatType;
    }

    public void setBoatType(String boatType) {
        this.boatType = boatType;
    }

    public Integer getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Integer basePrice) {
        this.basePrice = basePrice;
    }

    public String getStartCustomPricing() {
        return startCustomPricing;
    }

    public void setStartCustomPricing(String startCustomPricing) {
        this.startCustomPricing = startCustomPricing;
    }

    public String getEndCustomPricing() {
        return endCustomPricing;
    }

    public void setEndCustomPricing(String endCustomPricing) {
        this.endCustomPricing = endCustomPricing;
    }

    public Integer getCustomPricing() {
        return customPricing;
    }

    public void setCustomPricing(Integer customPricing) {
        this.customPricing = customPricing;
    }
}
