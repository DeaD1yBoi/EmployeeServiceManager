package com.esm.departments;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentsRepository extends JpaRepository<Departments, Integer> {

    public Optional<Departments> findByDepTitle(String title);
}
