package com.esm.user;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
@Tag(name = "User")
public class UsersController {

    private final UsersService service;

    @PostMapping("/set-new-password")
    public ResponseEntity<Map<String,String>> setNewPasswordForUserByAdmin(@RequestBody @Valid ForgotPasswordRequest request) throws Exception {
        return ResponseEntity.ok(Map.of("message",service.setNewPasswordForUserByAdmin(request)));
    }

    @GetMapping("")
    public ResponseEntity<List<UserWrapper>> getAllUsersWithDetails(){
        return ResponseEntity.ok(service.getAllUsersWithDetails());
    }

    @GetMapping("/me")
    public ResponseEntity<UserWrapper> getMyUserDetails(){
        return ResponseEntity.ok(service.getMyUserDetails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserWrapper> findUserById(@PathVariable Integer id){
     return ResponseEntity.ok(service.findUserById(id));
    }
}
