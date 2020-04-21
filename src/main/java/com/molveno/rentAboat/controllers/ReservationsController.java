package com.molveno.rentAboat.controllers;

import com.molveno.rentAboat.modules.Reservation;
import com.molveno.rentAboat.repositories.ReservationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationsController {

    @Autowired
    private ReservationsRepository reservationsRepository;

    @GetMapping
    public List<Reservation> getReservations(){
        return reservationsRepository.findAll();
    }

    @GetMapping("/{boattype}")
    public List<Reservation> getReservationsByType(@PathVariable("boattype") String boattype){
        return reservationsRepository.findByBoatType(boattype);
    }

    @GetMapping("/count/{boattype}")
    public Long countByType(@PathVariable("boattype") String boattype){
        return reservationsRepository.countByBoatType(boattype);
    }

    @PostMapping
    public Long addReservation(@RequestBody Reservation reservation){
//        reservation.setTripDate(LocalDate.now());
//        reservation.setTripTime(LocalTime.now());
        reservationsRepository.save(reservation);
        return reservation.getId();
    }

    @PutMapping("/update/{id}")
    public void updateReservation(@PathVariable Long id, Reservation reservation){
        reservation.setId(id);
        reservationsRepository.save(reservation);
    }

    @DeleteMapping("{id}")
    public void deleteReservation(@PathVariable Long id){
        reservationsRepository.deleteById(id);
    }
}
