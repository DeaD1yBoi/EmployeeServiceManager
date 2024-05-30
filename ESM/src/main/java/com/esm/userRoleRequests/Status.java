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
    private Integer id;

    @Column(unique = true, nullable = false)
    private String status;

    private String note;

}
