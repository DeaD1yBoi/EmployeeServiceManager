package com.esm.employees;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EmployeesRepository extends JpaRepository<Employees, Integer> {

    @Query("SELECT e FROM Employees e WHERE e.id NOT IN (SELECT u.empId.id FROM Users u)")
    List<Employees> findAllWithoutUser();

    public Optional<Employees> findByFullName(String fullName);

}
