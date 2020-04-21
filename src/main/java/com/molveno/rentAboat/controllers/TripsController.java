package com.molveno.rentAboat.controllers;

import com.molveno.rentAboat.modules.Trip;
import com.molveno.rentAboat.repositories.TripsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripsController {

    @Autowired
    private TripsRepository tripsRepository;

    @GetMapping
    public List<Trip> getTrips(){
        return tripsRepository.findAll();
    }

    @GetMapping("/sumduration/{status}")
    public Long sumDurationsByStatus(@PathVariable("status") String status){
        return tripsRepository.sumDurationByStatus(status);
    }

    @GetMapping("/sumduration/num/{boatNumber}")
    public Long sumDurationsByBoatNumber(@PathVariable("boatNumber") Integer boatNumber){
        return tripsRepository.sumDurationByBoatNumber(boatNumber);
    }

    @GetMapping("/sumincome/{status}")
    public Long sumIncomeByStatus(@PathVariable("status") String status){
        return tripsRepository.sumIncomeByStatus(status);
    }

    @GetMapping("/sumincome/num/{boatNumber}")
    public Long sumIncomeByBoatNumber(@PathVariable("boatNumber") Integer boatNumber){
        return tripsRepository.sumIncomeByBoatNumber(boatNumber);
    }

    @GetMapping("/count")
    public Long countTrips(){
        return tripsRepository.count();
    }

    @GetMapping("/count/{status}")
    public Long countTripsByStatus(@PathVariable("status") String requestedStatus){
        return tripsRepository.countByStatus(requestedStatus);
    }

    @PostMapping
    public void addTrip(@RequestBody Trip trip){
        trip.setTripDate(LocalDate.now());
        trip.setTripStart(LocalTime.now());
//        trip.setTripEnd(null);
        tripsRepository.save(trip);
    }

    @PutMapping("{id}")
    public void endTrip(@RequestBody Trip trip, @PathVariable Long id){
        trip.setId(id);
        //Set the trip end time, calculate duration and price accordingly:
        trip.setTripEnd(LocalTime.now());
        Duration tripDuration = Duration.between(trip.getTripStart(), trip.getTripEnd());
        trip.setDuration(tripDuration.toMinutes());
        long totalprice = (trip.getPricePerHour()/60)*trip.getDuration();
        trip.setTotalPrice(totalprice);
        tripsRepository.save(trip);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTrip(@PathVariable("id") Long id){
        tripsRepository.deleteById(id);
    }


}
