package com.esm;

import com.esm.auth.AuthenticationService;
import com.esm.auth.RegistrationRequest;
import com.esm.departments.Departments;
import com.esm.departments.DepartmentsRepository;
import com.esm.employees.Employees;
import com.esm.employees.EmployeesRepository;
import com.esm.positions.Positions;
import com.esm.positions.PositionsRepository;
import com.esm.roles.Roles;
import com.esm.roles.RolesRepository;
import com.esm.user.UsersRepository;
import com.esm.userRoleRequests.Status;
import com.esm.userRoleRequests.StatusRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
@EnableJpaAuditing
public class EmployeeServiceManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeServiceManagerApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(PositionsRepository positionsRepository,
                                    DepartmentsRepository departmentsRepository,
                                    RolesRepository rolesRepository,
                                    StatusRepository statusRepository,
                                    EmployeesRepository employeesRepository,
                                    UsersRepository usersRepository,
                                    AuthenticationService authenticationService,
                                    JdbcTemplate jdbcTemplate) {
        return args -> {

            //Positions
            if (positionsRepository.findByPosTitle("Manager").isEmpty()) {
                positionsRepository.save(Positions.builder().posTitle("Manager").build());
            }
            if (positionsRepository.findByPosTitle("Analyst").isEmpty()) {
                positionsRepository.save(Positions.builder().posTitle("Analyst").build());
            }
            if (positionsRepository.findByPosTitle("Developer").isEmpty()) {
                positionsRepository.save(Positions.builder().posTitle("Developer").build());
            }
            if (positionsRepository.findByPosTitle("Accountant").isEmpty()) {
                positionsRepository.save(Positions.builder().posTitle("Accountant").build());
            }
            if (positionsRepository.findByPosTitle("Sales Representative").isEmpty()) {
                positionsRepository.save(Positions.builder().posTitle("Sales Representative").build());
            }

            //Departments
            if (departmentsRepository.findByDepTitle("Human Resources").isEmpty()) {
                departmentsRepository.save(Departments.builder().depTitle("Human Resources").build());
            }
            if (departmentsRepository.findByDepTitle("Finance").isEmpty()) {
                departmentsRepository.save(Departments.builder().depTitle("Finance").build());
            }
            if (departmentsRepository.findByDepTitle("IT").isEmpty()) {
                departmentsRepository.save(Departments.builder().depTitle("IT").build());
            }
            if (departmentsRepository.findByDepTitle("Marketing").isEmpty()) {
                departmentsRepository.save(Departments.builder().depTitle("Marketing").build());
            }
            if (departmentsRepository.findByDepTitle("Sales").isEmpty()) {
                departmentsRepository.save(Departments.builder().depTitle("Sales").build());
            }

            //Employee
            if (rolesRepository.findByRoleName("EMPLOYEE").isEmpty()) {
                rolesRepository.save(Roles.builder()
                        .roleDesc("This is default role for all users")
                        .roleName("EMPLOYEE")
                        .owner(false)
                        .build());
            }

            //Role
            if (rolesRepository.findByRoleName("ADMIN").isEmpty()) {
                rolesRepository.save(Roles.builder()
                        .roleDesc("This is ADMIN role")
                        .roleName("ADMIN")
                        .owner(true)
                        .build());
            }

            //Statuses
            if (statusRepository.findById(1).isEmpty()
                    || !statusRepository.findById(1).orElseThrow().getStatus().equals("Waiting for owner response")) {
                statusRepository.save(Status.builder()
                        .id(1)
                        .note("Just created. Waiting for owner to respond")
                        .status("Waiting for owner response")
                        .build());
            }
            if (statusRepository.findById(2).isEmpty()
                    || !statusRepository.findById(2).orElseThrow().getStatus().equals("Owner declined")) {
                statusRepository.save(Status.builder()
                        .id(2)
                        .note("Owner declined request")
                        .status("Owner declined")
                        .build());
            }
            if (statusRepository.findById(3).isEmpty()
                    || !statusRepository.findById(3).orElseThrow().getStatus().equals("Waiting for admin response")) {
                statusRepository.save(Status.builder()
                        .id(3)
                        .note("Owner accepted request. Waiting for admin to respond")
                        .status("Waiting for admin response")
                        .build());
            }
            if (statusRepository.findById(4).isEmpty()
                    || !statusRepository.findById(4).orElseThrow().getStatus().equals("Admin declined")) {
                statusRepository.save(Status.builder()
                        .id(4)
                        .note("Admin declined request")
                        .status("Admin declined")
                        .build());
            }
            if (statusRepository.findById(5).isEmpty()
                    || !statusRepository.findById(5).orElseThrow().getStatus().equals("Access granted")) {
                statusRepository.save(Status.builder()
                        .id(5)
                        .note("Admin accepted. Access GRANTED!")
                        .status("Access granted")
                        .build());
            }
            if (statusRepository.findById(6).isEmpty()
                    || !statusRepository.findById(6).orElseThrow().getStatus().equals("Canceled")) {
                statusRepository.save(Status.builder()
                        .id(6)
                        .note("User canceled request")
                        .status("Canceled")
                        .build());
            }

            //First Employee
            if (employeesRepository.findByFullName("Yehor Kulish").isEmpty()) {
                employeesRepository.save(Employees.builder()
                        .fullName("Yehor Kulish")
                        .department(departmentsRepository.findByDepTitle("IT").orElseThrow())
                        .position(positionsRepository.findByPosTitle("Developer").orElseThrow())
                        .build());
            }

            //First User and giving him admin role
            if (usersRepository.findUsersByUsername("admin").isEmpty()) {
                authenticationService.register(RegistrationRequest.builder()
                        .username("admin")
                        .password("adminadmin")
                        .empId(employeesRepository.findByFullName("Yehor Kulish").orElseThrow().getId())
                        .build());
                rolesRepository.save(Roles.builder()
                        .id(rolesRepository.findByRoleName("ADMIN").orElseThrow().getId())
                        .roleDesc("This is ADMIN role")
                        .roleName("ADMIN")
                        .owner(true)
                        .users(List.of(usersRepository.findUsersByUsername("admin").orElseThrow()))
                        .build());
            }

            //Trigger
            initializeTrigger(jdbcTemplate);


        };
    }


    private void initializeTrigger(JdbcTemplate jdbcTemplate) {
        String triggerSQL = """
            CREATE OR REPLACE TRIGGER USER_ROLE_GRANTED_TRIGGER
            AFTER UPDATE ON ESM.USER_ROLE_REQUESTS
            FOR EACH ROW
            WHEN (NEW.STATUS_ID = 5)
            BEGIN
                INSERT INTO ESM.USERS_ROLES (USERS_ID, ROLES_ID)
                VALUES (:NEW.USER_ROLE_REQUESTED_BY, :NEW.REQUESTED_ROLE);
            END;
            """;

        jdbcTemplate.execute(triggerSQL);
    }
}

