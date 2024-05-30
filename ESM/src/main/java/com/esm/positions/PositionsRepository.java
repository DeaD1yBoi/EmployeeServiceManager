package com.esm.positions;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PositionsRepository extends JpaRepository<Positions, Integer> {

    public Optional<Positions> findByPosTitle(String title);
}
