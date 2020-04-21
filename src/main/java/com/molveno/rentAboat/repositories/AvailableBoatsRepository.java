package com.molveno.rentAboat.repositories;

import com.molveno.rentAboat.modules.Boat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvailableBoatsRepository extends JpaRepository<Boat, Long> {
    boolean existsByBoatNumber(int boatNumber);
    Long countByType(String type);
    Long countByStatus(String status);
    List<Boat> findByNumOfSeats(int seats);
    List<Boat> findByNumOfSeatsGreaterThanEqual(int seats);
    List<Boat> findByStatusAndNumOfSeatsGreaterThanEqual(String status, int seats);
    List<Boat> findByType(String type);
    List<Boat> findByStatus(String status);
//    List<Boat> findByStatusAndType(String status, String type);
    List<Boat> findByStatusAndTypeAndNumOfSeatsGreaterThanEqual(String status, String type, Integer numseats);
}
