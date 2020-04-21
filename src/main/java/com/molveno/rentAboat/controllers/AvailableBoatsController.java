package com.molveno.rentAboat.controllers;

import com.molveno.rentAboat.modules.Boat;
import com.molveno.rentAboat.repositories.AvailableBoatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/available")
public class AvailableBoatsController {

    @Autowired
    AvailableBoatsRepository availableBoatsRepository;

    @GetMapping
    public List<Boat> getAvailableBoats() {
        return availableBoatsRepository.findAll();
    }

    @GetMapping("/count/{type}")
    public Long countBoatsbyType(@PathVariable("type") String boatType) {
        return availableBoatsRepository.countByType(boatType);
    }

    @GetMapping("/count/status/{status}")
    public Long countByStatus(@PathVariable("status") String status) {
        return availableBoatsRepository.countByStatus(status);
    }

    @GetMapping("/newtrip/{numOfGuests}")
    public List<Boat> searchBoatBySeats(@PathVariable("numOfGuests") int numOfGuests) {
//        return availableBoatsRepository.findByNumOfSeats(numOfGuests);
        return availableBoatsRepository.findByNumOfSeatsGreaterThanEqual(numOfGuests);
    }

    @GetMapping("/{boatNumber}")
    public boolean searchByBoatNumber(@PathVariable("boatNumber") int boatNumber) {
        return availableBoatsRepository.existsByBoatNumber(boatNumber);
    }

    @GetMapping("/boatstatus/{status}")
    public List<Boat> searchBoatByStatus(@PathVariable("status") String status){
        return availableBoatsRepository.findByStatus(status);
    }

    @GetMapping("/reservationavailable/{status}/{type}/{numseats}")
    public List<Boat> searchBoatByStatusAndType(
            @PathVariable("status") String status,
            @PathVariable("type") String type,
            @PathVariable("numseats") Integer numseats){
//        return availableBoatsRepository.findByStatusAndType(status,type);
        return availableBoatsRepository.findByStatusAndTypeAndNumOfSeatsGreaterThanEqual(status, type, numseats);
    }

    @PostMapping
    public void addAvailableBoat(@RequestBody Boat boat) {
        availableBoatsRepository.save(boat);
    }

    @DeleteMapping("{id}")
    public void removeAvailableBoat(@PathVariable Long id) {
        availableBoatsRepository.deleteById(id);
    }

    @PutMapping("/updatestatus/{id}")
    public void updateStatus(@RequestBody Boat boat, @PathVariable Long id) {
        boat.setId(id);
        availableBoatsRepository.save(boat);
    }
}
