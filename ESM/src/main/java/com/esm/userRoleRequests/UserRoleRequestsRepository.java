package com.esm.userRoleRequests;

import com.esm.roles.Roles;
import com.esm.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRoleRequestsRepository extends JpaRepository<UserRoleRequests, Integer> {


     Optional<List<UserRoleRequests>> findUserRoleRequestsByRoleThatCanRespond(Roles role);

     Integer countAllByRoleThatCanRespond(Roles roleThatCanRespond);

     List<Optional<UserRoleRequests>> findByRequestedRoleAndUserRoleRequestedBy(Roles requestedRole, Users userRoleRequestedBy);

     Optional<UserRoleRequests> findById(Integer id);

    @Query("select r from UserRoleRequests r")
     List<UserRoleRequests> findAll();

}
