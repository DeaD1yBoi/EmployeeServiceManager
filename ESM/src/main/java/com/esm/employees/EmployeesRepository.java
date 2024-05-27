package com.esm.employees;

import com.esm.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeesRepository extends JpaRepository<Employees, Integer> {

    @Query("SELECT e FROM Employees e WHERE e.id NOT IN (SELECT u.empId.id FROM Users u)")
    List<Employees> findAllWithoutUser();

}
