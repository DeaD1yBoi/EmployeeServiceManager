package com.esm.userRoleRequests;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StatusRepository extends JpaRepository<Status, Integer> {

    public List<Status> findAll();
    public Optional<Status> findById(Integer id);
}
