package com.esm.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardCountResponse {
    private int roles;
    private int services;
    private int requests;
    private int waitingForResponse;
    private int users;
    private int employees;
}
