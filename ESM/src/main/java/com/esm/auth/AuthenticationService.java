package com.esm.auth;

import com.esm.employees.EmployeesRepository;
import com.esm.exceptions.EmployeeNotFoundException;
import com.esm.exceptions.UsernameAlreadyExistsException;
import com.esm.roles.RolesRepository;
import com.esm.security.JwtService;
import com.esm.user.Users;
import com.esm.user.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final RolesRepository rolesRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsersRepository usersRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final EmployeesRepository employeesRepository;

    public void register(RegistrationRequest request) {
        if (usersRepository.findUsersByUsername(request.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("User with provided username already exists");
        } else {
            var userRole = rolesRepository.findByRoleName("EMPLOYEE")
                    .orElseThrow(() -> new IllegalStateException("ROLE EMPLOYEE was not initialized"));
            log.info(String.valueOf(userRole));
            var user = Users.builder()
                    .username(request.getUsername())
                    .empId(employeesRepository
                            .findById(request.getEmpId())
                            .orElseThrow(() -> new EmployeeNotFoundException("Employee with provided id not found :/")))
                    .password(passwordEncoder.encode(request.getPassword()))
                    .accountLocked(false)
                    .enabled(true)
                    .roles(List.of(userRole))
                    .build();
            usersRepository.save(user);
        }
    }

    public LoginResponse login(LoginRequest loginRequest) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        var claims = new HashMap<String, Object>();
        var user = ((Users) auth.getPrincipal());
        claims.put("Username", user.getUsername());
        var jwtToken = jwtService.generateToken(claims, user);
        return LoginResponse.builder().token(jwtToken).build();
    }


}
