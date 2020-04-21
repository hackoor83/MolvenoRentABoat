package com.molveno.rentAboat.controllers;

import com.molveno.rentAboat.modules.Pricing;
import com.molveno.rentAboat.repositories.PricingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pricing")
public class PricingController {

    @Autowired
    PricingRepository pricingRepository;

    @GetMapping
    public List<Pricing> getPricing(){
       return pricingRepository.findAll();
    }

    @PostMapping
    public void addPricing(@RequestBody Pricing pricing){
        pricingRepository.save(pricing);
    }

    @DeleteMapping("{id}")
    public void removePricing(@PathVariable Long id){
        pricingRepository.deleteById(id);
    }

}
