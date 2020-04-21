package com.molveno.rentAboat.modules;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Reservation {
    @Id
    @GeneratedValue
    private Long id;

    private String boatType;
    private Integer boatNumber;
    private String tripDate;
    private String tripTime;
    private Double tripDuration;
    private String guestName;
    private Integer telNumber;
    private Double calculatedPrice;

    //For Rafts reservations:
    private String raftTripPeriod;
//    private Integer raftTripPrice;

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

    public Integer getBoatNumber() {
        return boatNumber;
    }

    public void setBoatNumber(Integer boatNumber) {
        this.boatNumber = boatNumber;
    }

    public String getTripDate() {
        return tripDate;
    }

    public void setTripDate(String tripDate) {
        this.tripDate = tripDate;
    }

    public String getTripTime() {
        return tripTime;
    }

    public void setTripTime(String tripTime) {
        this.tripTime = tripTime;
    }

    public Double getTripDuration() {
        return tripDuration;
    }

    public void setTripDuration(Double tripDuration) {
        this.tripDuration = tripDuration;
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public Integer getTelNumber() {
        return telNumber;
    }

    public void setTelNumber(Integer telNumber) {
        this.telNumber = telNumber;
    }

    public Double getCalculatedPrice() {
        return calculatedPrice;
    }

    public void setCalculatedPrice(Double calculatedPrice) {
        this.calculatedPrice = calculatedPrice;
    }

    public String getRaftTripPeriod() {
        return raftTripPeriod;
    }

    public void setRaftTripPeriod(String raftTripPeriod) {
        this.raftTripPeriod = raftTripPeriod;
    }

//    public Integer getRaftTripPrice() {
//        return raftTripPrice;
//    }
//
//    public void setRaftTripPrice(Integer raftTripPrice) {
//        this.raftTripPrice = raftTripPrice;
//    }
}
