package com.esm.dashboard;

import com.esm.employees.EmployeesRepository;
import com.esm.roles.Roles;
import com.esm.roles.RolesRepository;
import com.esm.security.JwtFilter;
import com.esm.services.ServicesRepository;
import com.esm.user.Users;
import com.esm.user.UsersRepository;
import com.esm.userRoleRequests.UserRoleRequestsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DashboardService {

    private final ServicesRepository servicesRepository;
    private final UsersRepository usersRepository;
    private final RolesRepository rolesRepository;
    private final UserRoleRequestsRepository requestsRepository;
    private final EmployeesRepository employeesRepository;

    private final JwtFilter jwtFilter;

    public DashboardCountResponse getCount() throws Exception {
        Users curUser = usersRepository.findUsersByUsername(jwtFilter.getCurrentUser())
                .orElseThrow(()->new Exception("Internal Server Error"));
        List<Roles> userRoles = rolesRepository.findRolesByUser(curUser);
        int requestsCanBeResponded = userRoles.stream()
                .mapToInt(requestsRepository::countAllByRoleThatCanRespond)
                .sum();
        return DashboardCountResponse.builder()
                .roles((int) rolesRepository.count())
                .services((int) servicesRepository.count())
                .requests((int) requestsRepository.count())
                .users((int) usersRepository.count())
                .employees((int) employeesRepository.count())
                .waitingForResponse(requestsCanBeResponded)
                .build();
    }

}
