package com.esm.employees;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeRequest {

    @NotNull(message = "Full Name field is mandatory")
    @NotEmpty(message = "Full Name field is mandatory")
    @NotBlank(message = "Full Name field is mandatory")
    private String fullName;

    @NotNull(message = "Position ID field is mandatory")
    private Integer posId;

    @NotNull(message = "Department ID field is mandatory")
    private Integer depId;
}
