package com.molveno.rentAboat.repositories;

import com.molveno.rentAboat.modules.Pricing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PricingRepository extends JpaRepository<Pricing, Long> {
}
