package com.esm.userRoleRequests;

import com.esm.exceptions.*;
import com.esm.roles.Roles;
import com.esm.roles.RolesRepository;
import com.esm.security.JwtFilter;
import com.esm.services.Services;
import com.esm.services.ServicesRepository;
import com.esm.user.Users;
import com.esm.user.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.lang.Boolean.TRUE;

@Service
@RequiredArgsConstructor
@Transactional
public class UserRoleRequestsService {

    private final UserRoleRequestsRepository roleRequestsRepository;
    private final JwtFilter jwtFilter;
    private final UsersRepository usersRepository;
    private final StatusRepository statusRepository;
    private final RolesRepository rolesRepository;
    private final ServicesRepository servicesRepository;

    public static UserRoleRequestsWrapper convertToWrapper(UserRoleRequests request) {


        String modifiedByUser = (request.getModifiedByUser() != null) ? request.getModifiedByUser().getUsername() : null;

        String roleThatCanRespond = (request.getRoleThatCanRespond() != null) ? request.getRoleThatCanRespond().getRoleName() : null;

        return UserRoleRequestsWrapper.builder()
                .id(request.getId())
                .createdDate(request.getCreatedDate())
                .lastModifiedDate(request.getLastModifiedDate())
                .note(request.getNote())
                .lastModifiedBy(modifiedByUser)
                .requestedRole(request.getRequestedRole().getRoleName())
                .requestedService(request.getRequestedService().getSrvTitle())
                .currentStatus(request.getStatus().getStatus())
                .userRoleRequestedBy(request.getUserRoleRequestedBy().getUsername())
                .roleThatCanRespond(roleThatCanRespond)
                .build();

    }

    public UserRoleRequestsWrapper findById(Integer id) {
        var response = roleRequestsRepository.findById(id)
                .orElseThrow(() -> new RequestNotFoundException("Request with provided id not found"));
        return convertToWrapper(response);
    }

    public List<UserRoleRequestsWrapper> findAll() {
        List<UserRoleRequests> requests = roleRequestsRepository.findAll();
        return requests.stream()
                .map(UserRoleRequestsService::convertToWrapper)
                .collect(Collectors.toList());
    }

    public UserRoleRequests createRequest(UserRoleRequestRequest request) throws Exception {

        Users requestedBy = usersRepository
                .findUsersByUsername(jwtFilter.getCurrentUser())
                .orElseThrow(() -> new Exception("Internal Server Error"));

        Services requestedService = servicesRepository.findBySrvTitle(request.getRequestedServiceName())
                .orElseThrow(() -> new ServiceNotFoundException("Service with provided name not found"));

        Roles requestedRole = requestedService.getRolesWithAcc().stream()
                .filter(roles -> request.getOwner().equals(roles.getOwner()))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No role found with owner set to false"));

        if (requestedBy.getRoles().stream()
                .anyMatch(roles -> requestedRole.getRoleName().equals(roles.getRoleName()))) {
            throw new UserAlreadyHasThisRoleException("User already has this role");
        }

        List<Optional<UserRoleRequests>> existingRequestsList = roleRequestsRepository
                .findByRequestedRoleAndUserRoleRequestedBy(requestedRole, requestedBy);
        if (!existingRequestsList.isEmpty() && existingRequestsList.stream()
                .anyMatch(existingRequest -> existingRequest.isPresent() &&
                        (existingRequest.get().getStatus().getId() == 1 ||
                                existingRequest.get().getStatus().getId() == 3 ||
                                existingRequest.get().getStatus().getId() == 5))) {
            throw new RequestAlreadyExistsAndNotDeclinedException(
                    "Request already exists and has not been declined, wait for admin or owner response");
        }



        Roles roleThatCanRespond = requestedService.getRolesWithAcc().stream()
                .filter(roles -> TRUE.equals(roles.getOwner()))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No role found with owner set to true"));

        Boolean isRoleEmpty = usersRepository.findUsersByRoleName(roleThatCanRespond.getRoleName())
                    .map(List::isEmpty)
                    .orElse(true);

        if (isRoleEmpty) {
            roleThatCanRespond = rolesRepository.findByRoleName("ADMIN").orElseThrow(() -> new IllegalStateException("ADMIN role was not initialized"));
        }




        var roleRequest = UserRoleRequests.builder()
                .userRoleRequestedBy(requestedBy)
                .requestedRole(requestedRole)
                .requestedService(requestedService)
                .roleThatCanRespond(roleThatCanRespond)
                .note(request.getNote())
                .status(statusRepository.findById(1)
                        .orElseThrow(() -> new IllegalStateException("STATUS TABLE was not initialized")))
                .modifiedByUser(null)
                .build();
        return roleRequestsRepository.save(roleRequest);
    }

    private List<UserRoleRequests> requestsUserCanRespond() throws Exception {
        Users user = usersRepository
                .findUsersByUsername(jwtFilter.getCurrentUser())
                .orElseThrow(() -> new Exception("Internal server error"));
        List<Roles> roles = user.getRoles();
        return roles.stream()
                .map(roleRequestsRepository::findUserRoleRequestsByRoleThatCanRespond)
                .flatMap(Optional::stream)
                .flatMap(List::stream).toList();
    }

    public List<UserRoleRequestsWrapper> findRequestsThatCanBeResponded() throws Exception {

        return requestsUserCanRespond().stream()
                .map(UserRoleRequestsService::convertToWrapper)
                .collect(Collectors.toList());
    }

    public String respondRequest(UpdateRequestBody requestBody) throws Exception {
        Users user = usersRepository
                .findUsersByUsername(jwtFilter.getCurrentUser())
                .orElseThrow(() -> new Exception("Internal server error"));

        List<Roles> roles = user.getRoles();

        Optional<UserRoleRequests> optionalRequest = requestsUserCanRespond()
                .stream()
                .filter(req -> req.getId().equals(requestBody.id))
                .findFirst();

        if (optionalRequest.isEmpty()) {
            throw new UnauthorizedException("You are not authorized to respond to this request");
        }

        Optional<Status> status = roles.stream()
                .anyMatch(role -> role.getRoleName().equals("ADMIN"))
                ? (requestBody.response
                ? statusRepository.findById(5)
                : statusRepository.findById(4))
                : (requestBody.response
                ? statusRepository.findById(3)
                : statusRepository.findById(2));

        Roles roleThatCanRespond = null;
        if (status.orElseThrow(() -> new IllegalStateException("STATUS TABLE was not initialized"))
                .getId() == 3) {
            roleThatCanRespond = rolesRepository.findByRoleName("ADMIN")
                    .orElseThrow(() -> new IllegalStateException("Role ADMIN was not initialized"));
        }

        UserRoleRequests request = optionalRequest
                .orElseThrow(() -> new Exception("Internal server error"));

        String note = null;
        if (request.getNote() != null) {
            note = request.getNote() + "\n||" + user.getUsername() + " added note: " + requestBody.note;
        }

        UserRoleRequests builtRequest = UserRoleRequests.builder()
                .id(requestBody.id)
                .requestedRole(request.getRequestedRole())
                .requestedRole(request.getRequestedRole())
                .roleThatCanRespond(roleThatCanRespond)
                .requestedService(request.getRequestedService())
                .userRoleRequestedBy(request.getUserRoleRequestedBy())
                .status(status
                        .orElseThrow(() -> new IllegalStateException("STATUS TABLE was not initialized")))
                .note(note)
                .modifiedByUser(user)
                .build();
        roleRequestsRepository.save(builtRequest);
        return "Status of request has been successfully updated!";


    }

}
