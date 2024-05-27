package com.esm.user;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ForgotPasswordRequest {

    @NotNull(message = "Password field is mandatory")
    String password;
    @NotNull(message = "Username field is mandatory")
    String username;
}
