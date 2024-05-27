package com.esm.auth;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.ACCEPTED;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login (@RequestBody @Valid LoginRequest request){
        return ResponseEntity.ok(service.login(request));
    }

    @PostMapping("/register")
    @ResponseStatus(ACCEPTED)
    public ResponseEntity<?> register(@RequestBody @Valid RegistrationRequest request){
        service.register(request);
        return ResponseEntity.accepted().build();
    }

}
