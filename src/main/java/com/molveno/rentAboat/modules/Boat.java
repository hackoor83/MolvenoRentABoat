package com.molveno.rentAboat.modules;

import javax.persistence.*;

@Entity
public class Boat {
    @Id
    @GeneratedValue
    private Long id;
    private Integer boatNumber;
    private Integer numOfSeats;
    private Integer basePrice;
    private Integer customPrice;
    private String type;
    private Integer chargingTime;
    private String status;

//    @ManyToOne
//    private BoatsInMaintenance boatsInMaintenance;

//    @Enumerated(EnumType.STRING)
//    private BoatType type;

//    Pricing pricing = new Pricing();


//    public BoatsInMaintenance getBoatsInMaintenance() {
//        return boatsInMaintenance;
//    }
//
//    public void setBoatsInMaintenance(BoatsInMaintenance boatsInMaintenance) {
//        this.boatsInMaintenance = boatsInMaintenance;
//    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBoatNumber() {
        return boatNumber;
    }

    public void setBoatNumber(Integer boatNumber) {
        this.boatNumber = boatNumber;
    }

    public Integer getNumOfSeats() {
        return numOfSeats;
    }

    public void setNumOfSeats(Integer numOfSeats) {
        this.numOfSeats = numOfSeats;
    }

    public Integer getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Integer basePrice) {
        this.basePrice = basePrice;
//        this.basePrice = Pricing.getBasePrice();;
    }

    public Integer getCustomPrice() {
        return customPrice;
    }

    public void setCustomPrice(Integer customPrice) {
        this.customPrice = customPrice;
//        this.customPrice = pricing.getCustomPricing();
    }

    public Integer getChargingTime() {
        return chargingTime;
    }

    public void setChargingTime(Integer chargingTime) {
        this.chargingTime = chargingTime;
    }
}
