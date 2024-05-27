package com.esm.userRoleRequests;

import com.esm.roles.Roles;
import com.esm.services.Services;
import com.esm.user.Users;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class UserRoleRequests {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_req_seq")
    @SequenceGenerator(name = "role_req_seq", sequenceName = "role_req_seq", allocationSize = 1)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_role_requested_by")
    private Users userRoleRequestedBy;

    @ManyToOne
    @JoinColumn(name = "requested_role")
    private Roles requestedRole;

    @ManyToOne
    @JoinColumn(name = "requested_service")
    private Services requestedService;

    private String note;

    @ManyToOne
    @JoinColumn(name = "role_that_can_respond")
    private Roles roleThatCanRespond;


    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @ManyToOne
    @JoinColumn(name = "modified_by_user")
    private Users modifiedByUser;
}
