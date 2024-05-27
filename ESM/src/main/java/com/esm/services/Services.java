package com.esm.services;

import com.esm.roles.Roles;
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
public class Services {

    @Id
    @SequenceGenerator(name = "services_seq", sequenceName = "services_seq",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "services_seq")
    private Integer id;

    @Column(unique = true)
    private String srvTitle;

    @OneToMany(mappedBy = "service")
    @JsonIgnore
    private List<Roles> rolesWithAcc;
}
