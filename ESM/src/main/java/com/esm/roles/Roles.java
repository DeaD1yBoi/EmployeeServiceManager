package com.esm.roles;

import com.esm.services.Services;
import com.esm.user.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Roles {

    @Id
    @SequenceGenerator(name = "roles_seq", sequenceName = "roles_seq",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roles_seq")
    private Integer id;

    @Column(unique = true, nullable = false)
    private String roleName;

    private String roleDesc;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private List<Users> users;

    @ManyToOne
    @JoinColumn(name = "acc_to_service")
    private Services service;

    private Boolean owner;
}
