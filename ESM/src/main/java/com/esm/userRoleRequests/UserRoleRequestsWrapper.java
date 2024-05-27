package com.esm.userRoleRequests;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRoleRequestsWrapper {

    private Integer id;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private String note;
    private String lastModifiedBy;
    private String requestedRole;
    private String requestedService;
    private String currentStatus;
    private String userRoleRequestedBy;
    private String roleThatCanRespond;

}
