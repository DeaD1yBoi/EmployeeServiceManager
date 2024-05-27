package com.esm.user;

import com.esm.exceptions.UnauthorizedException;
import com.esm.exceptions.UserNotFoundException;
import com.esm.roles.Roles;
import com.esm.roles.RolesService;
import com.esm.security.JwtFilter;
import com.esm.services.Services;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UsersService {

    private final UsersRepository usersRepository;
    private final RolesService rolesService;
    private final PasswordEncoder passwordEncoder;
    private final JwtFilter jwtFilter;


    private static UserWrapper convertToWrapper(Users user) {
        return UserWrapper.builder()
                .id(user.getId())
                .username(user.getUsername())
                .fullName(user.getEmpId().getFullName())
                .posTitle(user.getEmpId().getPosition().getPosTitle())
                .depTitle(user.getEmpId().getDepartment().getDepTitle())
                .roleNames(user.getRoles().stream()
                        .map(Roles::getRoleName)
                        .distinct()
                        .collect(Collectors.toList()))
                .srvNames(user.getRoles().stream()
                        .map(Roles::getService)
                        .filter(Objects::nonNull)
                        .map(Services::getSrvTitle)
                        .distinct()
                        .collect(Collectors.toList()))
                .build();
    }

    public List<UserWrapper> getAllUsersWithDetails() {
        List<Users> users = usersRepository.findAll();
        return users.stream()
                .map(UsersService::convertToWrapper)
                .collect(Collectors.toList());
    }

    public String setNewPasswordForUserByAdmin(ForgotPasswordRequest request) throws Exception {

        if (rolesService.findUserRoles().stream().noneMatch(roles -> roles.getRoleName().equals("ADMIN"))) {
            throw new UnauthorizedException("You are not authorized to do this function");
        }
        Users user = usersRepository.findUsersByUsername(request.getUsername()).orElseThrow(() -> new UsernameNotFoundException("No user found with provided username"));
        usersRepository.save(
                Users.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .empId(user.getEmpId())
                        .enabled(user.isEnabled())
                        .accountLocked(user.isAccountLocked())
                        .roles(user.getRoles())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .build()
        );
        return "New password: \"" + request.getPassword() + "\"\n" +
                "Was set for user: \"" + request.getUsername() + "\"";
    }

    public UserWrapper getMyUserDetails() {
        String currentUsername = jwtFilter.getCurrentUser();
        return convertToWrapper(usersRepository.findUsersByUsername(currentUsername)
                .orElseThrow(()-> new UsernameNotFoundException("User with provided username not found"))) ;
    }

    public UserWrapper findUserById(Integer id) {
        return convertToWrapper(usersRepository.findUsersById(id)
                .orElseThrow(()-> new UserNotFoundException("User with provided id not found")));
    }
}
