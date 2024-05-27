package com.esm.roles;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RolesWrapper {
    private Integer id;
    private String roleName;
    private String roleDesc;
    private String service;
    private Boolean owner;
}
