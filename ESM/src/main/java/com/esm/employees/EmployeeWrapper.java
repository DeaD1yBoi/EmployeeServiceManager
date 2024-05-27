package com.esm.employees;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeWrapper {

    private String fullName;
    private String departmentTitle;
    private String positionTitle;
}
