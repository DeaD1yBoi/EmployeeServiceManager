package com.esm.services;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServicesRepository extends JpaRepository<Services, Integer> {


    public List<Services> findAll();

    public Optional<Services> findBySrvTitle(String title);

}
