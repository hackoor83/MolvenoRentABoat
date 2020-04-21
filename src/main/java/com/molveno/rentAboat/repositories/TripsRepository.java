package com.molveno.rentAboat.repositories;

import com.molveno.rentAboat.modules.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TripsRepository extends JpaRepository<Trip, Long> {
    Long countByStatus(String status);

    @Query(value = "SELECT sum(duration) FROM Trip WHERE status= :status")
    Long sumDurationByStatus(@Param("status") String status);

    @Query(value = "SELECT sum(duration) FROM Trip WHERE boatNumber= :boatNumber")
    Long sumDurationByBoatNumber(@Param("boatNumber") Integer boatNumber);

    @Query(value = "SELECT sum(totalPrice) FROM Trip WHERE status= :status")
    Long sumIncomeByStatus(@Param("status") String status);

    @Query(value = "SELECT sum(totalPrice) FROM Trip WHERE boatNumber= :boatNumber")
    Long sumIncomeByBoatNumber(@Param("boatNumber") Integer boatNumber);
}
