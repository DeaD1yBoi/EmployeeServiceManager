package com.esm.userRoleRequests;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "status_seq")
    @SequenceGenerator(name = "status_seq", sequenceName = "status_seq", allocationSize = 1)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String status;

    private String note;

}
