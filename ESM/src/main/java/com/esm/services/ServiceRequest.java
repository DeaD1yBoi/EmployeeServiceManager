package com.esm.services;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequest {

    @NotEmpty(message = "You must provide service title")
    @NotBlank(message = "You must provide service title")
    @NotNull(message = "You must provide service title")
    public String serviceTitle;
}
