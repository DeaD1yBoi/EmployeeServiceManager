package com.esm.roles;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("roles")
@RequiredArgsConstructor
@Tag(name = "Roles")
public class RolesController {

    private final RolesService rolesService;

    @GetMapping("")
    public ResponseEntity<List<RolesWrapper>> findAll(){
        return ResponseEntity.ok(rolesService.findAll());
    }
    @GetMapping("/me")
    public ResponseEntity<List<RolesWrapper>> findMyRoles() throws Exception {
        return ResponseEntity.ok(rolesService.findUserRoles());
    }
}
