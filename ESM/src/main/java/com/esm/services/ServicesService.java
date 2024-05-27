package com.esm.services;

import com.esm.exceptions.ServiceAlreadyExistsException;
import com.esm.exceptions.ServiceNotFoundException;
import com.esm.exceptions.UnauthorizedException;
import com.esm.roles.Roles;
import com.esm.roles.RolesRepository;
import com.esm.security.JwtFilter;
import com.esm.user.Users;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ServicesService {

    private final ServicesRepository servicesRepository;
    private final RolesRepository rolesRepository;
    private final JwtFilter jwtFilter;


    private static Map<String, Object> convertUsersToMap(Users user) {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", user.getId());
        userMap.put("username", user.getUsername());
        return userMap;
    }

    private static Map<String, Object> convertRolesToMap(Roles role) {
        Map<String, Object> roleMap = new HashMap<>();
        roleMap.put("id", role.getId());
        roleMap.put("roleName", role.getRoleName());
        return roleMap;
    }

    private static ServiceWrapper convertToWrapper(Services service) {

        Roles ownerRole = service.getRolesWithAcc().stream()
                .filter(Roles::getOwner)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No owner role found"));

        Map<String, Object> ownerRoleMapped = convertRolesToMap(ownerRole);

        List<Users> ownerUsers = ownerRole.getUsers();
        List<Map<String, Object>> listOfOwnerUsers = ownerUsers.stream()
                .map(ServicesService::convertUsersToMap)
                .collect(Collectors.toList());

        Roles roleWithAccess = service.getRolesWithAcc().stream()
                .filter(role -> !role.getOwner())
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No not owner roles with access found"));

        Map<String, Object> notOwnerRoleWithAccMap = convertRolesToMap(roleWithAccess);


        return ServiceWrapper.builder()
                .serviceId(service.getId())
                .serviceTitle(service.getSrvTitle())
                .ownerRole(ownerRoleMapped)
                .ownerUsers(listOfOwnerUsers)
                .notOwnerRoleWithAccess(notOwnerRoleWithAccMap)
                .build();
    }

    private static Roles createRole(ServiceRequest request, String roleNameStr, Boolean owner, Services service) {
        return Roles.builder()
                .roleName(request.serviceTitle + roleNameStr)
                .roleDesc("This is "+roleNameStr+" role of " + request.serviceTitle + " service")
                .service(service)
                .owner(owner)
                .build();
    }

    public List<Services> findAll() {
        return servicesRepository.findAll();
    }

    public ServiceWrapper findById(Integer id) {
        return convertToWrapper(servicesRepository.findById(id)
                .orElseThrow(() -> new ServiceNotFoundException("Service with provided id not found")));
    }

    public void createService(ServiceRequest request) throws Exception {
        if (!jwtFilter.isAdmin()) {
            throw new UnauthorizedException("You are not authorized to do this");
        }
        if (servicesRepository.findBySrvTitle(request.serviceTitle).isPresent()) {
            throw new ServiceAlreadyExistsException("Service with provided title already exists in database");
        }
        servicesRepository.save(Services.builder()
                .srvTitle(request.serviceTitle)
                .build());
        rolesRepository.save(createRole(request, "Owner", true, servicesRepository.findBySrvTitle(request.serviceTitle)
                .orElseThrow(() -> new Exception("Internal server error"))));
        rolesRepository.save(createRole(request, "Access", false, servicesRepository.findBySrvTitle(request.serviceTitle)
                .orElseThrow(() -> new Exception("Internal server error"))));
    }
}
