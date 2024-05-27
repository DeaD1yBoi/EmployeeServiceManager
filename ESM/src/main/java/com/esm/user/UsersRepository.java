package com.esm.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {

    Optional<Users> findUsersById(Integer id);

    @Query("SELECT u FROM Users u JOIN u.roles r WHERE r.roleName = :roleName")
    Optional<List<Users>> findUsersByRoleName(@Param("roleName") String roleName);

    Optional<Users> findUsersByUsername(String username);

}
