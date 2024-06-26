package com.esm.positions;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PositionsService {

    private final PositionsRepository repository;

    public List<Positions> findAll() {
        return repository.findAll();
    }
}
