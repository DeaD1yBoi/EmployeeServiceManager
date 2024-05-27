package com.esm.roles;

import com.esm.security.JwtFilter;
import com.esm.security.JwtService;
import com.esm.user.Users;
import com.esm.user.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class RolesService {

    private final RolesRepository rolesRepository;
    private final JwtFilter jwtFilter;
    private final UsersRepository usersRepository;

    private static RolesWrapper toWrapper(Roles role) {

        String serviceTitle = (role.getService() != null) ? role.getService().getSrvTitle() : null;

        return RolesWrapper.builder()
                .id(role.getId())
                .roleName(role.getRoleName())
                .roleDesc(role.getRoleDesc())
                .service(serviceTitle)
                .owner(role.getOwner())
                .build();
    }

    public List<RolesWrapper> findAll() {
        return rolesRepository.findAll()
                .stream()
                .map(RolesService::toWrapper)
                .collect(Collectors.toList());
    }

    public List<RolesWrapper> findUserRoles() throws Exception {
        Users user = usersRepository.findUsersByUsername(jwtFilter.getCurrentUser()).orElseThrow(() -> new Exception("Internal server error"));
        return rolesRepository.findRolesByUser(user).stream()
                .map(RolesService::toWrapper)
                .collect(Collectors.toList());

    }
}
