package com.esm.employees;


import com.esm.departments.Departments;
import com.esm.departments.DepartmentsRepository;
import com.esm.exceptions.DepartmentNotFoundException;
import com.esm.exceptions.PositionNotFoundException;
import com.esm.positions.PositionsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeesService {

    private final EmployeesRepository repository;
    private final PositionsRepository positionsRepository;
    private final DepartmentsRepository departmentsRepository;

    public List<Employees> findEmployeesWithoutUser() {
        return repository.findAllWithoutUser();
    }

    public void createEmployee(EmployeeRequest request) {
        repository.save(Employees.builder()
                .fullName(request.getFullName())
                .position(positionsRepository.findById(request.getPosId())
                        .orElseThrow(()-> new PositionNotFoundException("Position with provided id was not found")))
                .department(departmentsRepository.findById(request.getDepId())
                        .orElseThrow(()-> new DepartmentNotFoundException("Department with provided id was not found")))
                .build());
    }

    private static EmployeeWrapper toWrapper(Employees employee){
        return EmployeeWrapper.builder()
                .fullName(employee.getFullName())
                .departmentTitle(employee.getDepartment().getDepTitle())
                .positionTitle(employee.getPosition().getPosTitle())
                .build();
    }

    public List<EmployeeWrapper> findAll() {
        return repository.findAll().stream().map(EmployeesService::toWrapper).collect(Collectors.toList());
    }
}
