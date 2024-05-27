package com.esm.employees;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("employees")
@RequiredArgsConstructor
@Tag(name = "Employees")
public class EmployeesController {

    private final EmployeesService service;

    @GetMapping("")
    public List<EmployeeWrapper> findAll(){
        return service.findAll();
    }

    @GetMapping("/no-role")
    public ResponseEntity<List<Employees>> findEmployeesWithoutUser (){
        return ResponseEntity.ok(service.findEmployeesWithoutUser());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createEmployee(@RequestBody @Valid EmployeeRequest request){
        service.createEmployee(request);
        return ResponseEntity.accepted().build();
    }
}
