package com.molveno.rentAboat.modules;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Trip {

    @Id
    @GeneratedValue
    private Long id;

    private LocalDate tripDate;
    private LocalTime tripStart;
    private LocalTime tripEnd;
    private Integer boatNumber;
    private Long duration;
    private Long pricePerHour;
    private Long totalPrice;
    private String status;

    //To create Guest POJO and Repo in the next sprint
    private String guestName;
    private String guestIDType;
    private Integer guestIDNumber;
    private Integer guestTelNum;

    //For Rafts trips
    private String raftTripPeriod;
    private Integer raftTripPrice;
    private String listOfRafts;

    @ManyToOne
    private Boat boat;

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

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalTime getTripStart() {
        return tripStart;
    }

    public void setTripStart(LocalTime tripStart) {
        this.tripStart = tripStart;
    }

    public LocalTime getTripEnd() {
        return tripEnd;
    }

    public void setTripEnd(LocalTime tripEnd) {
        this.tripEnd = tripEnd;
    }

    public LocalDate getTripDate() {
        return tripDate;
    }

    public void setTripDate(LocalDate tripDate) {
        this.tripDate = tripDate;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Boat getBoat() {
        return boat;
    }

    public void setBoat(Boat boat) {
        this.boat = boat;
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getGuestIDType() {
        return guestIDType;
    }

    public void setGuestIDType(String guestIDType) {
        this.guestIDType = guestIDType;
    }

    public Integer getGuestIDNumber() {
        return guestIDNumber;
    }

    public void setGuestIDNumber(Integer guestIDNumber) {
        this.guestIDNumber = guestIDNumber;
    }

    public Integer getGuestTelNum() {
        return guestTelNum;
    }

    public void setGuestTelNum(Integer guestTelNum) {
        this.guestTelNum = guestTelNum;
    }

    public Long getPricePerHour() {
        return pricePerHour;
    }

    public void setPricePerHour(Long pricePerHour) {
        this.pricePerHour = pricePerHour;
    }

    public String getRaftTripPeriod() {
        return raftTripPeriod;
    }

    public void setRaftTripPeriod(String raftTripPeriod) {
        this.raftTripPeriod = raftTripPeriod;
    }

    public Integer getRaftTripPrice() {
        return raftTripPrice;
    }

    public void setRaftTripPrice(Integer raftTripPrice) {
        this.raftTripPrice = raftTripPrice;
    }

    public String getListOfRafts() {
        return listOfRafts;
    }

    public void setListOfRafts(String listOfRafts) {
        this.listOfRafts = listOfRafts;
    }
}
