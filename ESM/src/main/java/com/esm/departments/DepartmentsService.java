package com.esm.departments;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DepartmentsService {

    private final DepartmentsRepository repository;

    public List<Departments> findAll() {
        return repository.findAll();
    }
}
