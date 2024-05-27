package com.esm.roles;

import com.esm.services.Services;
import com.esm.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RolesRepository extends JpaRepository<Roles, Integer> {

    Optional<Roles> findByRoleName(String role);

    List<Roles> findAll();

    @Query("SELECT r from Roles r where r.service=:service and r.owner=true")
    Optional<Roles> findServiceOwnerRole(Services service);

    @Query("SELECT r FROM Roles r JOIN r.users u WHERE u = :user")
    List<Roles> findRolesByUser(@Param("user") Users user);

}
