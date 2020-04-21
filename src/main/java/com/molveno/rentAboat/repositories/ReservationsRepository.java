package com.molveno.rentAboat.repositories;

import com.molveno.rentAboat.modules.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationsRepository extends JpaRepository<Reservation,Long> {
    List<Reservation> findByBoatType(String type);
    Long countByBoatType(String type);
}
