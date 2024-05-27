package com.esm.services;

import com.esm.user.Users;
import com.esm.user.UsersRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
@Tag(name = "Services")
public class ServicesController {

    private final ServicesService servicesService;
    private final UsersRepository usersRepository;

    @GetMapping("")
    public ResponseEntity<List<Services>> findAll() {
        return ResponseEntity.ok(servicesService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceWrapper> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(servicesService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createService(@RequestBody @Valid ServiceRequest request) throws Exception {
        servicesService.createService(request);
        return ResponseEntity.status(201).build();
    }

}
