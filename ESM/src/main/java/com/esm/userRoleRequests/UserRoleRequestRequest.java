package com.esm.userRoleRequests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRoleRequestRequest {

    @NotEmpty(message = "Requested Service name is mandatory")
    @NotBlank(message = "Requested Service name is mandatory")
    private String requestedServiceName;

    private Boolean owner;

    private String note;


}
