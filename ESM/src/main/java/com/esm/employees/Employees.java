package com.esm.employees;


import com.esm.departments.Departments;
import com.esm.positions.Positions;
import com.esm.user.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Employees {

    @Id
    @SequenceGenerator(name = "employees_seq", sequenceName = "employees_seq",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employees_seq")
    private Integer id;

    private String fullName;

    @ManyToOne
    @JoinColumn(name = "dep_id")
    private Departments department;

    @ManyToOne
    @JoinColumn(name = "pos_id")
    private Positions position;

}
