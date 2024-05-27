package com.esm.departments;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Departments {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "departments_seq")
    @SequenceGenerator(name = "departments_seq", sequenceName = "departments_SEQ", allocationSize = 1)
    private Integer id;

    private String depTitle;

}
