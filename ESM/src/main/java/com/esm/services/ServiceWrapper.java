package com.esm.services;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceWrapper {

    private Integer serviceId;
    private String serviceTitle;

    private Map<String, Object> ownerRole;
    private List<Map<String, Object>> ownerUsers;

    private Map<String,Object> notOwnerRoleWithAccess;
}
